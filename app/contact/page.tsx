import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactUsPage() {
  // Placeholder submit handler for the form
  async function handleSubmit(formData: FormData) {
    'use server';
    // In a real application, you would process the form data here,
    // e.g., send an email, save to a database, etc.
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    console.log('Contact form submitted:', { name, email, message });
    // You might redirect or show a success message here.
    // For now, it just logs to the console.
  }

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Mail className="h-20 w-20 text-primary mb-6 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            We&apos;d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Send className="h-6 w-6 mr-2 text-primary" /> Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/90 mb-1">
                    Full Name
                  </label>
                  <Input type="text" name="name" id="name" placeholder="Your Name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-1">
                    Email Address
                  </label>
                  <Input type="email" name="email" id="email" placeholder="you@example.com" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/90 mb-1">
                    Message
                  </label>
                  <Textarea name="message" id="message" rows={5} placeholder="Your message..." required />
                </div>
                <Button type="submit" className="w-full">
                  Send Message <Send className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-primary" /> Our Office
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-foreground/90 space-y-2">
                <p>SuperLibrary Headquarters</p>
                <p>Kyiv, Ukraine</p>
                <p>Heroiv Dnipra 5, 01001</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Phone className="h-6 w-6 mr-2 text-primary" /> Contact Details
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-foreground/90 space-y-2">
                <p>
                  <strong>Email:</strong> support@superlibrary.example.com
                </p>
                <p>
                  <strong>Phone:</strong> +380 67 123 45 67
                </p>
                <p>
                  <em>(Please note: These are placeholder details.)</em>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
} 