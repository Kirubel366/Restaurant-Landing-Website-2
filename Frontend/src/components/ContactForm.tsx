import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export function ContactForm() {
  const { sendContactForm, contactFormSubmitting } = useSettings();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const result = await sendContactForm({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });

    if (result.success) {
      toast.success(result.message);
      setFormData({ name: "", email: "", message: "" });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="premium-card p-8 md:p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="icon-container w-12 h-12">
          <MessageSquare className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-serif text-2xl">Send Us a Message</h2>
          <p className="text-sm text-muted-foreground">
            We'd love to hear from you
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            Name
          </Label>
          <Input
            id="contact-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            className="h-12"
            maxLength={100}
            disabled={contactFormSubmitting}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="contact-email" className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            Email
          </Label>
          <Input
            id="contact-email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="your@email.com"
            className="h-12"
            maxLength={255}
            disabled={contactFormSubmitting}
            required
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="contact-message" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
            Message
          </Label>
          <Textarea
            id="contact-message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="How can we help you?"
            className="min-h-[140px] resize-none"
            maxLength={1000}
            disabled={contactFormSubmitting}
            required
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-12 gap-2"
          disabled={contactFormSubmitting}
        >
          {contactFormSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
