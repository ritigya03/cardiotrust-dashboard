import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Hospital, initialHospitals, truncateWallet } from "@/data/mockData";
import { Building2 } from "lucide-react";

const HospitalRegistry = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals);
  const [name, setName] = useState("");
  const [wallet, setWallet] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wallet.trim()) {
      toast({ title: "Missing fields", description: "Please fill in both fields.", variant: "destructive" });
      return;
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet.trim())) {
      toast({ title: "Invalid wallet", description: "Address must be a valid 0x… Ethereum address.", variant: "destructive" });
      return;
    }
    const newHospital: Hospital = {
      id: crypto.randomUUID(),
      name: name.trim(),
      wallet: wallet.trim(),
      status: "Active",
      submissions: 0,
      lastRound: 0,
    };
    setHospitals((prev) => [...prev, newHospital]);
    setName("");
    setWallet("");
    toast({ title: "Hospital registered", description: `${newHospital.name} joined the network.` });
  };

  return (
    <DashboardLayout
      title="Hospital Registry"
      description="Onboard hospitals to the federated learning network"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 shadow-[var(--shadow-card)]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base">Register Hospital</CardTitle>
                <CardDescription>Add a new node to the network</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Hospital Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. St. Mary's Medical Center"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet">Ethereum Wallet Address</Label>
                <Input
                  id="wallet"
                  placeholder="0x…"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              <Button type="submit" variant="medical" className="w-full">
                Register Hospital
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Registered Hospitals</CardTitle>
            <CardDescription>{hospitals.length} active nodes participating in training</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total Submissions</TableHead>
                  <TableHead className="text-right">Last Round</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hospitals.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell className="font-medium">{h.name}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {truncateWallet(h.wallet)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="success">{h.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{h.submissions}</TableCell>
                    <TableCell className="text-right tabular-nums">{h.lastRound}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HospitalRegistry;
