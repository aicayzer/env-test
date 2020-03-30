import React from "react";
import { Table, Button } from "antd";
import "./tableComponent.css";
import { products } from "./products.js";

let data = products;

// let data = products.map((item) => ({
// 	action: item.action,
// 	object: item.action,
// 	object_identifier: item.object_identifier,
// 	s3_location: "www.test.com" + item.s3_location
// }));

data.forEach((item, i) => {
	item.key = i + 1;
});

class TableRender extends React.Component {
	state = {
		filteredInfo: null,
		sortedInfo: null
	};

	handleChange = (pagination, filters, sorter) => {
		console.log("Various parameters", pagination, filters, sorter);
		this.setState({
			filteredInfo: filters,
			sortedInfo: sorter
		});
	};

	clearFilters = () => {
		this.setState({ filteredInfo: null });
	};

	clearAll = () => {
		this.setState({
			filteredInfo: null,
			sortedInfo: null
		});
	};

	setobjectSort = () => {
		this.setState({
			sortedInfo: {
				order: "descend",
				columnKey: "object"
			}
		});
	};

	render() {
		let { sortedInfo, filteredInfo } = this.state;
		sortedInfo = sortedInfo || {};
		filteredInfo = filteredInfo || {};
		const columns = [
			{
				title: "action",
				dataIndex: "action",
				key: "action",
				filters: [ { text: "Updated", value: "updated" }, { text: "Cutoff", value: "cutoff" } ],
				filteredValue: filteredInfo.action || null,
				onFilter: (value, record) => record.action.includes(value),
				sorter: (a, b) => a.action.length - b.action.length,
				sortOrder: sortedInfo.columnKey === "action" && sortedInfo.order,
				ellipsis: true
			},
			{
				title: "object",
				dataIndex: "object",
				key: "object",
				filters: [
					{ text: "ingredient", value: "ingredient" },
					{ text: "meal", value: "meal" },
					{ text: "recipe", value: "recipe" },
					{ text: "card", value: "card" },
					{ text: "order", value: "order" }
				],
				//enter test here to check if all of the above are valid/nothing is missing
				filteredValue: filteredInfo.object || null,
				onFilter: (value, record) => record.object.includes(value),
				sorter: (a, b) => a.object.length - b.object.length,
				sortOrder: sortedInfo.columnKey === "object" && sortedInfo.order,
				ellipsis: true
			},
			// {
			// 	title: "Name",
			// 	dataIndex: "name",
			// 	key: "name",
			// 	filters: [ { text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" } ],
			// 	filteredValue: filteredInfo.name || null,
			// 	onFilter: (value, record) => record.name.includes(value),
			// 	sorter: (a, b) => a.name.length - b.name.length,
			// 	sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
			// 	ellipsis: true
			// },
			{
				title: "object_identifier",
				dataIndex: "object_identifier",
				key: "object_identifier",
				sorter: (a, b) => a.object_identifier - b.object_identifier,
				sortOrder: sortedInfo.columnKey === "object_identifier" && sortedInfo.order,
				ellipsis: true
			},
			{
				title: "s3_location",
				dataIndex: "s3_location",
				key: "s3_location",
				sorter: (a, b) => a.s3_location.length - b.s3_location.length,
				sortOrder: sortedInfo.columnKey === "s3_location" && sortedInfo.order,
				ellipsis: true
			}
		];
		console.log(data);
		return (
			<div>
				<div className="table-operations">
					<Button onClick={this.setobjectSort}>Sort object</Button>
					<Button onClick={this.clearFilters}>Clear filters</Button>
					<Button onClick={this.clearAll}>Clear filters and sorters</Button>
				</div>
				<Table columns={columns} dataSource={data} onChange={this.handleChange} />
			</div>
		);
	}
}
export default TableRender;