import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
} from 'recharts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../components/ui/chart';
import { TrendingUp } from 'lucide-react';

type BuildingModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  buildingName: string | null;
};

const BuildingModal: React.FC<BuildingModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  buildingName,
}) => {
  const chartData = [
    { day: '01', data_consumed: 186 },
    { day: '02', data_consumed: 305 },
    { day: '03', data_consumed: 237 },
    { day: '04', data_consumed: 73 },
    { day: '05', data_consumed: 209 },
    { day: '06', data_consumed: 214 },
  ];

  const chartConfig = {
    data_consumed: {
      label: 'Data Consumed',
      color: 'red',
    },
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="w-[95vw] h-[95vh] max-w-[95vw] max-h-[95vh] m-auto p-0 bg-white bg-opacity-90 overflow-hidden flex flex-col">
        <DialogHeader className="p-4 sm:p-6">
          <DialogTitle>Manage {buildingName}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto flex-grow p-4">
          <div className="chart-wrapper mx-auto flex flex-col items-center justify-center gap-6 lg:flex-row lg:items-start">
            <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <Card className="w-full" x-chunk="charts-01-chunk-5">
                <CardContent className="flex gap-4 p-4">
                  <div className="grid items-center gap-2">
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                      <div className="text-sm text-muted-foreground">Bandwidth Consumed</div>
                      <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                        562/600
                        <span className="text-sm font-normal text-muted-foreground">GB</span>
                      </div>
                    </div>
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                      <div className="text-sm text-muted-foreground">People Connected</div>
                      <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                        73/120
                      </div>
                    </div>
                    <div className="grid flex-1 auto-rows-min gap-0.5">
                      <div className="text-sm text-muted-foreground">Routers Installed</div>
                      <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                        8/12
                      </div>
                    </div>
                  </div>
                  <ChartContainer
                    config={{
                      move: {
                        label: 'Bandwidth Consumed',
                        color: 'red',
                      },
                      exercise: {
                        label: 'People Connected',
                        color: 'green',
                      },
                      stand: {
                        label: 'Routers Installed',
                        color: 'blue',
                      },
                    }}
                    className="mx-auto aspect-square w-full max-w-[80%]"
                  >
                    <RadialBarChart
                      margin={{
                        left: -10,
                        right: -10,
                        top: -10,
                        bottom: -10,
                      }}
                      data={[
                        {
                          activity: 'routers-installed',
                          value: (8 / 12) * 100,
                          fill: 'var(--color-stand)',
                        },
                        {
                          activity: 'people-connected',
                          value: (46 / 60) * 100,
                          fill: 'var(--color-exercise)',
                        },
                        {
                          activity: 'bandwidth-consumed',
                          value: (245 / 360) * 100,
                          fill: 'var(--color-move)',
                        },
                      ]}
                      innerRadius="20%"
                      barSize={24}
                      startAngle={90}
                      endAngle={450}
                    >
                      <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        dataKey="value"
                        tick={false}
                      />
                      <RadialBar dataKey="value" background cornerRadius={5} />
                    </RadialBarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <CardHeader>
                <CardTitle>Data Consumption for last 7 days</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={value => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="data_consumed" fill="red" radius={8}>
                      <LabelList fill="white" position="inside" offset={12} fontSize={12} />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuildingModal;
