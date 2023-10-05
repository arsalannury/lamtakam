import React, { useEffect } from "react";
import Chart from "chart.js/auto";

const CommentsCount: React.FC<any> = () => {
  const renderChart = (): any => {
    const ctx = document.getElementById("acquisitions") as any;
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["تایید شده", "تایید نشده", "بدون وضعیت"],
        datasets: [
          {
            label: "تعداد",
            data: [10, 2, 5],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14,
                family: "SansIran",
              },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    renderChart();
  }, []);

  return (
    <div style={{ width: "500px" }}>
      <canvas id="acquisitions"></canvas>
    </div>
  );
};

export default CommentsCount;
