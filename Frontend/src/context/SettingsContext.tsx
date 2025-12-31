import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface SettingsContextType {
  itemDescriptionsEnabled: boolean;
  categoryDescriptionsEnabled: boolean;
  videoEnabled: boolean;
  videoUrl: string;
  pendingVideoUrl: string;
  videoSubmitted: boolean;
  videoLoading: boolean;
  loading: boolean;
  updateItemDescriptions: (enabled: boolean) => Promise<void>;
  updateCategoryDescriptions: (enabled: boolean) => Promise<void>;
  updateVideoStatus: (enabled: boolean) => Promise<void>;
  submitVideo: () => Promise<boolean>;
  sendContactForm: (
    form: ContactForm
  ) => Promise<{ success: boolean; message: string }>;
  contactFormSubmitting: boolean;
  setPendingVideoUrl: (url: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [itemDescriptionsEnabled, setItemDescriptionsEnabled] = useState(false);
  const [categoryDescriptionsEnabled, setCategoryDescriptionsEnabled] =
    useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [pendingVideoUrl, setPendingVideoUrl] = useState("");
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactFormSubmitting, setContactFormSubmitting] = useState(false);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/settings");
      const settings = Array.isArray(data) ? data[0] : data;

      if (settings) {
        // MAPPING DATABASE KEYS -> FRONTEND STATE
        setItemDescriptionsEnabled(!!settings.enableItemDescription);
        setCategoryDescriptionsEnabled(!!settings.enableCategoryDescription);
        setVideoEnabled(!!settings.enableVideoFeature);
        setVideoUrl(settings.videoLink || "");
        setPendingVideoUrl(settings.videoLink || "");
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateItemDescriptions = async (enabled: boolean) => {
    // 1. Optimistic UI update
    setItemDescriptionsEnabled(enabled);

    try {
      // 2. PATCH using the correct Database key
      const { data } = await axiosInstance.patch("/settings", {
        enableItemDescription: enabled,
      });
      // 3. Sync with server just in case
      setItemDescriptionsEnabled(!!data.enableItemDescription);
      toast.success(
        enabled ? "Item descriptions enabled" : "Item descriptions disabled"
      );
    } catch (err) {
      // Rollback on error
      setItemDescriptionsEnabled(!enabled);
      toast.error("Failed to save setting");
    }
  };

  const updateCategoryDescriptions = async (enabled: boolean) => {
    setCategoryDescriptionsEnabled(enabled);
    try {
      const { data } = await axiosInstance.patch("/settings", {
        enableCategoryDescription: enabled,
      });
      setCategoryDescriptionsEnabled(!!data.enableCategoryDescription);
      toast.success(
        enabled
          ? "Category descriptions enabled"
          : "Category descriptions disabled"
      );
    } catch (err) {
      setCategoryDescriptionsEnabled(!enabled);
      toast.error("Failed to save setting");
    }
  };

  const updateVideoStatus = async (enabled: boolean) => {
    setVideoEnabled(enabled);
    try {
      const { data } = await axiosInstance.patch("/settings", {
        enableVideoFeature: enabled,
      });
      setVideoEnabled(!!data.enableVideoFeature);
      toast.success(enabled ? "Video section visible" : "Video section hidden");
    } catch (err) {
      setVideoEnabled(!enabled);
      toast.error("Failed to update video status");
    }
  };

  const submitVideo = async (): Promise<boolean> => {
    const url = pendingVideoUrl.trim();

    // REGEX to validate YouTube and TikTok patterns
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/.+$/;
    const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/.+$/;

    // Validation Check
    if (!url) {
      toast.error("Please enter a video URL");
      return false;
    }

    if (!youtubeRegex.test(url) && !tiktokRegex.test(url)) {
      toast.error(
        "Unsupported link. Please use a valid YouTube or TikTok URL."
      );
      return false;
    }

    try {
      setVideoLoading(true);
      const { data } = await axiosInstance.patch("/settings", {
        videoLink: url,
        enableVideoFeature: true,
      });

      setVideoUrl(data.videoLink);
      setVideoEnabled(!!data.enableVideoFeature);
      setVideoSubmitted(true);
      toast.success("Video updated successfully");
      setTimeout(() => setVideoSubmitted(false), 3000);
      return true;
    } catch (err) {
      toast.error("Failed to save video URL to database");
      return false;
    } finally {
      setVideoLoading(false);
    }
  };

  const sendContactForm = async (form: ContactForm) => {
    setContactFormSubmitting(true);
    try {
      const { data } = await axiosInstance.post("/sendemail", form);
      toast.success("Message sent successfully");
      return { success: true, message: data.message };
    } catch (err: any) {
      const message = err.response?.data?.message || "Error sending message.";
      toast.error(message);
      alert(`Failed to send: ${err.message || "Unknown Error"}`);
      return { success: false, message };
    } finally {
      setContactFormSubmitting(false);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        itemDescriptionsEnabled,
        categoryDescriptionsEnabled,
        videoEnabled,
        videoUrl,
        pendingVideoUrl,
        videoSubmitted,
        videoLoading,
        loading,
        updateItemDescriptions,
        updateCategoryDescriptions,
        updateVideoStatus,
        submitVideo,
        sendContactForm,
        setPendingVideoUrl,
        contactFormSubmitting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error("useSettings must be used within a SettingsProvider");
  return context;
}
