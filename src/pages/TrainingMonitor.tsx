import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { hospitalAccuracyHistory, hospitalEpsilon, TOTAL_ROUNDS } from "@/data/mockData";
import { Activity, Loader2, CheckCircle2, Pause, Play } from "lucide-react";

type HospitalStatus = "Idle" | "Training" | "Submitted";

const HOSPITALS = ["Owner Hospital", "Hospital Alpha", "Hospital Beta"];

const statusConfig: Record<HospitalStatus, { variant: "secondary" | "warning" | "success"; icon: typeof Pause }> = {
  Idle: { variant: "secondary", icon: Pause },
  Training: { variant: "warning", icon: Loader2 },
  Submitted: { variant: "success", icon: CheckCircle2 },
};

const TrainingMonitor = () => {
  const [round, setRound] = useState(7);
  const [statuses, setStatuses] = useState<Record<string, HospitalStatus>>(
    Object.fromEntries(HOSPITALS.map((h) => [h, "Idle"])) as Record<string, HospitalStatus>
  );
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateRound = async () => {
    if (isSimulating || round >= TOTAL_ROUNDS) return;
    setIsSimulating(true);
    const nextRound = round + 1;

    // Reset all to idle
    setStatuses(Object.fromEntries(HOSPITALS.map((h) => [h, "Idle"])) as Record<string, HospitalStatus>);
    await wait(300);

    // Animate each hospital: Training -> Submitted
    for (const hospital of HOSPITALS) {
      setStatuses((prev) => ({ ...prev, [hospital]: "Training" }));
      await wait(900);
      setStatuses((prev) => ({ ...prev, [hospital]: "Submitted" }));
      await wait(400);
    }

    setRound(nextRound);
    setIsSimulating(false);
  };

  const progressPct = (round / TOTAL_ROUNDS) * 100;

  return (
    <DashboardLayout
      title="Training Monitor"
      description="Live status of hospital nodes during federated training"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {HOSPITALS.map((hospital) => {
            const status = statuses[hospital];
            const cfg = statusConfig[status];
            const Icon = cfg.icon;
            const data = hospitalAccuracyHistory[hospital].map((v, i) => ({ round: i + 1, acc: v }));
            return (
              <Card key={hospital} className="shadow-[var(--shadow-card)] overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{hospital}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">DP-SGD enabled</p>
                    </div>
                    <Badge variant={cfg.variant} className="gap-1">
                      <Icon className={`h-3 w-3 ${status === "Training" ? "animate-spin" : ""}`} />
                      {status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-baseline justify-between border-t border-border pt-3">
                    <span className="text-xs text-muted-foreground">Privacy Budget</span>
                    <span className="font-mono text-sm font-semibold text-secondary">
                      ε = {hospitalEpsilon[hospital].toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Per-round accuracy</span>
                      <span className="font-mono text-xs font-medium text-foreground">
                        {(data[data.length - 1].acc * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-12 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                          <YAxis hide domain={[0.4, 1]} />
                          <Line
                            type="monotone"
                            dataKey="acc"
                            stroke="hsl(var(--primary))"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="shadow-[var(--shadow-card)]">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Round</p>
                  <p className="text-2xl font-bold text-foreground tabular-nums">
                    Round {round} <span className="text-muted-foreground font-normal text-base">/ {TOTAL_ROUNDS}</span>
                  </p>
                </div>
              </div>
              <Button
                onClick={simulateRound}
                disabled={isSimulating || round >= TOTAL_ROUNDS}
                variant="medical"
                size="lg"
                className="gap-2"
              >
                {isSimulating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Simulating…
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Simulate Round
                  </>
                )}
              </Button>
            </div>
            <Progress value={progressPct} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2 tabular-nums">
              {progressPct.toFixed(0)}% complete
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default TrainingMonitor;
