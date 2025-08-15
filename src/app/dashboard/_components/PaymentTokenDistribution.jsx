"use client";
import { useEffect, useState } from "react";
import { useEOAAddress } from "@/hooks";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { formatAddress } from "@/lib/utils/strings";
import { getTokenByAddress } from "@/lib/tokenlist";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PaymentTokenDistribution() {
  const { eoaAddress } = useEOAAddress();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eoaAddress) {
      fetch(`/api/get-token-distribution?eoaAddress=${eoaAddress}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const labels = data.data.map(d => getTokenByAddress(d.token)?.symbol);
            const volumes = data.data.map(d => d.volume);
            
            setChartData({
              labels: labels,
              datasets: [
                {
                  label: 'Volume',
                  data: volumes,
                  backgroundColor: [
                    '#db5827', // Primary Orange
                    '#8b5cf6', // Purple
                    '#10b981', // Green
                    '#f59e0b', // Amber
                    '#ef4444', // Red
                  ],
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1,
                },
              ],
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [eoaAddress]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
            color: 'rgba(255, 255, 255, 0.6)',
            font: {
                family: 'Inter'
            }
        }
      },
    },
    cutout: '70%',
  };

  return (
    <div>
      <h2 className="font-medium mb-4">Payment Token Distribution</h2>
      <div className="h-48 relative">
        {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-48 border-t-2 border-orange-500 rounded-full animate-spin"></div>
            </div>
        ) : chartData && chartData.datasets[0].data.length > 0 ? (
          <Doughnut data={chartData} options={options} />
        ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/40">
                No payment data available.
            </div>
        )}
      </div>
    </div>
  );
}