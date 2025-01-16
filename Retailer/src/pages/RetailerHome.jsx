import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import  Chart  from "./Chart";
import Chart2 from "./Chart2";
import { CreditCard, DollarSign, Users } from "lucide-react";

const RetailerHome = () => {
  return (
    <>
      <div className="grid gap-4 auto-rows-min md:grid-cols-2  md:gap-8 lg:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-0 bg-muted/50 aspect-video">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total product</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between rounded-xl bg-muted/50 md:min-h-min">
  <div className="flex-grow flex-[1] min-w-[300px]  max-h-[200px] p-4 md:min-h-min">
    <Chart height={150}/>
  </div>
  <div className="flex-grow flex-[1] min-w-[300px] h-[400px] p-4">
    <Chart2 />
  </div>
</div>

    </>
  );
};

export default RetailerHome;
