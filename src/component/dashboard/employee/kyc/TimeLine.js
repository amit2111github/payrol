import React from "react";
import "../EmployeDashboard.css";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

export default function BasicTimeline({ step }) {
	// console.log("step mi", step);
	const data = [
		{ id: 1, info: "personal details" },
		{ id: 2, info: "Aadhar Details" },
		{ id: 3, info: "Education Details" },
		{ id: 4, info: "Bank Details" },
		{ id: 5, info: "Address Details" },
	];
	const getColor = (id) => {
		if (id == step) return "#5473e3";
		if (id < step) return "green";
		return "gray";
	};
	return (
		<Timeline>
			{data.map((cur) => (
				<TimelineItem key={cur.id}>
					<TimelineSeparator>
						<TimelineDot
							style={{ backgroundColor: getColor(cur.id) }}
						/>
						{cur.id != data.length && <TimelineConnector />}
					</TimelineSeparator>

					<TimelineContent className="text-context">
						{cur.info}
					</TimelineContent>
				</TimelineItem>
			))}
		</Timeline>
	);
}
