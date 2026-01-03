import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our menu, need to book a private event, or just want to say hello.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 bg-card rounded-3xl shadow-xl border border-border/50 overflow-hidden">
          
          {/* Contact Info Side */}
          <div className="bg-secondary/30 p-10 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold mb-8 text-foreground">Contact Info</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">123 Culinary Avenue<br />Food District, FD 90210</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Call Us</h3>
                    <p className="text-muted-foreground">(555) 123-4567<br />(555) 987-6543</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                    <p className="text-muted-foreground">hello@cravify.com<br />support@cravify.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Opening Hours</h3>
                    <p className="text-muted-foreground">
                      Mon-Fri: 11:00 AM - 10:00 PM<br />
                      Sat-Sun: 10:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
               {/* Map placeholder image */}
               <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop"
                alt="Restaurant Location Map"
                className="w-full h-48 object-cover rounded-2xl opacity-80"
              />
            </div>
          </div>

          {/* Form Side */}
          <div className="p-10 md:p-12 bg-white">
            <h2 className="font-display text-3xl font-bold mb-2">Send a Message</h2>
            <p className="text-muted-foreground mb-8">Fill out the form below and we'll reply shortly.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  className="h-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  required 
                  className="h-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input 
                  id="subject" 
                  placeholder="Private Event Inquiry" 
                  required 
                  className="h-12 rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="How can we help you?" 
                  rows={5} 
                  required 
                  className="resize-none rounded-xl bg-muted/30 border-border/50 focus:bg-background transition-colors"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-12 rounded-xl text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
