import { DashboardLayout } from "@/components/DashboardLayout";
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
import { recentTransactions, CONTRACT_ADDRESS, truncateWallet } from "@/data/mockData";
import { Building2, GitMerge, Link2, ArrowRight, CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const HOSPITALS = ["Owner Hospital", "Hospital Alpha", "Hospital Beta"];

const Aggregation = () => {
  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    toast({ title: "Copied", description: "Contract address copied to clipboard." });
  };

  return (
    <DashboardLayout
      title="Aggregation & Blockchain"
      description="FedAvg aggregation and on-chain anchoring on Sepolia"
    >
      <div className="space-y-6">
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Federation Flow</CardTitle>
            <CardDescription>Local updates → secure aggregation → blockchain anchor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-4">
              {/* Hospitals column */}
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                {HOSPITALS.map((h) => (
                  <div
                    key={h}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 min-w-[200px] shadow-[var(--shadow-card)]"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-accent-foreground shrink-0">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">{h}</span>
                  </div>
                ))}
              </div>

              <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 lg:rotate-0 shrink-0" />

              {/* Aggregation */}
              <div className="rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground px-6 py-5 min-w-[220px] shadow-[var(--shadow-elegant)]">
                <div className="flex items-center gap-2 mb-1">
                  <GitMerge className="h-5 w-5" />
                  <span className="font-semibold">FedAvg</span>
                </div>
                <p className="text-xs opacity-90">Weighted averaging of encrypted gradients</p>
              </div>

              <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90 lg:rotate-0 shrink-0" />

              {/* Blockchain */}
              <div className="rounded-xl bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground px-6 py-5 min-w-[220px] shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2 mb-1">
                  <Link2 className="h-5 w-5" />
                  <span className="font-semibold">Blockchain</span>
                </div>
                <p className="text-xs opacity-90">Sepolia Testnet</p>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-muted/50 border border-border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Smart Contract Address</p>
                <p className="font-mono text-sm text-foreground break-all">{CONTRACT_ADDRESS}</p>
              </div>
              <Button onClick={copyAddress} variant="outline" size="sm" className="gap-2 shrink-0">
                <Copy className="h-3.5 w-3.5" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Recent Blockchain Transactions</CardTitle>
            <CardDescription>Submission anchors written to Sepolia</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Round</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>TX Hash</TableHead>
                  <TableHead className="text-right">Block Number</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium tabular-nums">#{tx.round}</TableCell>
                    <TableCell>{tx.hospital}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {truncateWallet(tx.txHash)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{tx.block.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="success" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {tx.status}
                      </Badge>
                    </TableCell>
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

export default Aggregation;
