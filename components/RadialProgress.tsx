import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

interface RadialProgressProps {
  score: number;
  size?: number;
}

const RadialProgress: React.FC<RadialProgressProps> = ({ score, size = 100 }) => {
  const data = [{ name: 'score', value: score, fill: '#2563eb' }];

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
        <RadialBarChart 
          width={size} 
          height={size} 
          cx="50%" 
          cy="50%" 
          innerRadius="80%" 
          outerRadius="100%" 
          barSize={10} 
          data={data} 
          startAngle={90} 
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: '#f1f5f9' }}
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className={`${size < 60 ? 'text-xs' : 'text-xl'} font-bold text-slate-800`}>
              {Math.round(score)}%
            </span>
        </div>
    </div>
  );
};

export default RadialProgress;