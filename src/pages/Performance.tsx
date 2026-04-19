import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { globalMetrics, hospitalEpsilon } from "@/data/mockData";
import { Target, Trophy, ShieldCheck } from "lucide-react";

const Performance = () => {
  const bestAcc = Math.max(...globalMetrics.map((m) => m.accuracy));
  const bestF1 = Math.max(...globalMetrics.map((m) => m.f1));
  const avgEps =
    Object.values(hospitalEpsilon).reduce((a, b) => a + b, 0) /
    Object.values(hospitalEpsilon).length;

  const stats = [
    {
      label: "Best Accuracy",
      value: `${(bestAcc * 100).toFixed(1)}%`,
      icon: Trophy,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Best F1 Score",
      value: bestF1.toFixed(3),
      icon: Target,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      label: "Average ε (Privacy Budget)",
      value: avgEps.toFixed(2),
      icon: ShieldCheck,
      color: "text-chart-auc",
      bg: "bg-accent",
    },
  ];

  return (
    <DashboardLayout
      title="Global Model Performance"
      description="Aggregated metrics across all federation rounds"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="shadow-[var(--shadow-card)]">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{s.label}</p>
                      <p className={`text-3xl font-bold mt-1 tabular-nums ${s.color}`}>
                        {s.value}
                      </p>
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${s.bg} ${s.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Metrics across 20 rounds</CardTitle>
            <CardDescription>Accuracy, F1 Score, and AUC of the global model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[420px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={globalMetrics} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="round"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    label={{ value: "Round", position: "insideBottom", offset: -5, fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <YAxis
                    domain={[0, 1]}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(v) => v.toFixed(2)}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => value.toFixed(3)}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    name="Accuracy"
                    stroke="hsl(var(--chart-accuracy))"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="f1"
                    name="F1 Score"
                    stroke="hsl(var(--chart-f1))"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="auc"
                    name="AUC"
                    stroke="hsl(var(--chart-auc))"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Performance;
