import React, { useCallback, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const CommentsCount: React.FC<any> = () => {
  const [chartData, setChartData] = useState([]);

  const renderChart = async () => {
    const request = await fetch("http://localhost:8000/comments/counts");
    const comments = await request.json();

    const image = new Image();
    image.src = "mainlogo.svg";

    const plugin = {
      id: "customCanvasBackgroundImage",
      beforeDraw: (chart: any) => {
        if (image.complete) {
          const ctx = chart.ctx;
          const { top, left, width, height } = chart.chartArea;
          const x = left + width / 2 - image.width / 2;
          const y = top + height / 2 - image.height / 2;
          ctx.drawImage(image, x, y);
        } else {
          image.onload = () => chart.draw();
        }
      },
    };

    const ctx = document.getElementById("acquisitions") as any;
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["تایید شده", "تایید نشده", "همه نظرات"],
        datasets: [
          {
            label: "تعداد",
            data: [
              comments.data.length > 0 &&
                (comments.data[0] as any).length +
                  (comments.data[1] as any).length,
              comments.data.length > 0 && (comments.data[1] as any).length,
              comments.data.length > 0 && (comments.data[0] as any).length,
            ],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      plugins: [plugin],
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            titleFont: { family: "SansIran" },
          },
          title: {
            display: true,
            text: "نظرات کاربران بر اساس وضعیت تایید",
            position: "right",
            font: { family: "SansIran" },
          },

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
