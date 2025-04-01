
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from 'lucide-react';
import { toast } from "sonner";

interface EmailFormProps {
  isOpen: boolean;
  onClose: () => void;
  calculationData: {
    totalRevenue: number;
    totalDeals: number;
    averageDealSize: number;
    comparisonDealSize: number;
  };
}

const EmailForm: React.FC<EmailFormProps> = ({ 
  isOpen, 
  onClose,
  calculationData 
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    setSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      toast.success("Report sent successfully to " + email);
      setSending(false);
      onClose();
      setEmail('');
      setName('');
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary">Email Deal Size Report</DialogTitle>
          <DialogDescription>
            Send your calculated average deal size report to any email address
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="required">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
            />
          </div>
          
          <div className="bg-secondary/10 p-3 rounded-md">
            <h4 className="font-medium text-sm mb-2">Report Contents:</h4>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Total Revenue: ₹{calculationData.totalRevenue.toLocaleString('en-IN')}</li>
              <li>• Number of Deals: {calculationData.totalDeals}</li>
              <li>• Average Deal Size: ₹{calculationData.averageDealSize.toLocaleString('en-IN')}</li>
              <li>• Comparison Value: ₹{calculationData.comparisonDealSize.toLocaleString('en-IN')}</li>
              <li>• Visual Charts and Analysis</li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="mt-2 sm:mt-0"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 flex items-center"
              disabled={sending}
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Report
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailForm;
