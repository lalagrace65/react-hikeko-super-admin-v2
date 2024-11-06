import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../UserContext.jsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {  ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { LuTrendingUp } from "react-icons/lu";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import PropTypes from 'prop-types';
import axios from 'axios';
import { baseURL } from '@/Url';


export default function DashboardPage() {
    const { user } = useContext(UserContext);
    const [totalUsers, setTotalUsers] = useState();
    const [totalNewSignups, setTotalNewSignups] = useState();
    const [totalTrails, setTotalTrails] = useState();
    const [totalBookings, setTotalBookings] = useState();
    const [totalTravelAgencyAccounts, setTotalTravelAgencyAccounts] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUserCount() {
            try {
                setLoading(true);
                const [userCountRes, newSignupsRes, trailsRes, bookingsRes, travelAgencyAccountsRes] = await Promise.all([
                    axios.get(`${baseURL}/userCounts`),
                    axios.get(`${baseURL}/newSignups`),
                    axios.get(`${baseURL}/totalTrails`),
                    axios.get(`${baseURL}/totalBookings`),
                    axios.get(`${baseURL}/totalTravelAgencyAccounts`),

                ]);
                setTotalUsers(userCountRes.data.totalUsers);
                setTotalNewSignups(newSignupsRes.data.totalNewSignups);
                setTotalTrails(trailsRes.data.totalTrails);
                setTotalBookings(bookingsRes.data.totalBookings);
                setTotalTravelAgencyAccounts(travelAgencyAccountsRes.data.totalTravelAgencyAccounts);
            } catch (error) {
                console.error('Error fetching user count:', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        }
        fetchUserCount();
    }, []);


    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
      ]
       
      const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "#2563eb",
        },
        mobile: {
          label: "Mobile",
          color: "#60a5fa",
        },
      } 
      // Define PropTypes to validate chartConfig structure
    const ChartConfigPropTypes = PropTypes.shape({
        label: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
    });
  
    chartConfig.desktop = ChartConfigPropTypes;
    chartConfig.mobile = ChartConfigPropTypes;

    return (
        <div className='flex'>
            <Sidebar />
            <div className="flex-1 p-4">
                {!!user && (
                    <h1>Welcome, {user.username}!</h1>
                )}
                
                <h1>Dashboard</h1>

                <div className="flex flex-wrap gap-4 mt-4">
                    {/* Card 1 */}
                    <Card className="w-[220px] h-[200px]">
                        <CardHeader>
                            <CardTitle>User Statistics</CardTitle>
                            <CardDescription>Overview of user engagement</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Total Users: {totalUsers}</p>
                            <p>New Signups: {totalNewSignups}</p>
                        </CardContent>

                    </Card>

                    {/* Card 2 */}
                    <Card className="w-[220px] h-[200px]">
                        <CardHeader>
                            <CardTitle>Trails Activity</CardTitle>
                            <CardDescription>Latest  added trails</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Total Trails: {totalTrails}</p>
                            
                        </CardContent>

                    </Card>

                    {/* Card 3 */}
                    <Card className="w-[220px] h-[200px]">
                        <CardHeader>
                            <CardTitle>Bookings Report</CardTitle>
                            <CardDescription>...</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Total Bookings: {totalBookings} </p>
                        </CardContent>

                    </Card>

                    {/* Card 4 */}
                    <Card className="w-[220px] h-[200px]">
                        <CardHeader>
                            <CardTitle>Partners</CardTitle>
                            <CardDescription>...</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Total Partners: {totalTravelAgencyAccounts}</p>
                        </CardContent>
                       
                    </Card>
                </div>

                <div className='gap-4 mt-4'>
                <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>Bar Chart - Multiple</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <LuTrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                    </div>
                </CardFooter>
                </Card>
                </div>
            </div>
        </div>
    );
}
