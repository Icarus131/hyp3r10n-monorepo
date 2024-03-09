import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Chart.js Bar Chart',
		},
	},
};

const labels = ["Safe"];

export const data = {
	labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: labels.map(() => Math.floor(Math.random()*10)),
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
		{
			label: 'Dataset 2',
			data: labels.map(() => Math.floor(Math.random()*10)),
			backgroundColor: 'rgba(53, 162, 235, 0.5)',
		},
	],
};

function Charts() {
	return (
		<div className='flex flex-col bg-slate-900 rounded-lg mx-2 h-[95%]'>
			<Bar options={options} data={data} className='chart h-3/5'/>
			<Bar options={options} data={data} className='chart h-3/5'/>
		</div>
	) 
}

export default Charts
