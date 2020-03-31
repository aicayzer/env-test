import React from "react";
import { Table, Input, Button } from "antd";
import "./TableRender.css";
import { products } from "./products.js";
// import ReactDOM from "react-dom";
// import "antd/dist/antd.css";
import "./index.css";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

// let data = products;

let data = products.map((item) => ({
	action            : item.action,
	object            : item.action,
	object_identifier : item.object_identifier,
	s3_location       : item.s3_location,
	s3_location_link  : `https://s3.console.aws.amazon.com/s3/object/${item.s3_location.substring(5)}`
}));

data.forEach((item, i) => {
	item.key = i + 1;
});

console.log("DATA IS BELOW.......", data);

class TableRender extends React.Component {
	state = {
		filteredInfo   : null,
		sortedInfo     : null,
		searchText     : "",
		searchedColumn : ""
	};

	handleChange = (pagination, filters, sorter) => {
		// console.log("Various parameters", pagination, filters, sorter);
		this.setState({
			filteredInfo : filters,
			sortedInfo   : sorter
		});
	};

	clearFilters = () => {
		this.setState({ filteredInfo: null });
	};

	clearAll = () => {
		this.setState({
			filteredInfo : null,
			sortedInfo   : null
		});
	};

	setobjectSort = () => {
		this.setState({
			sortedInfo : {
				order     : "descend",
				columnKey : "object"
			}
		});
	};

	getColumnSearchProps = (dataIndex) => ({
		filterDropdown                : ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [ e.target.value ] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					icon={<SearchOutlined />}
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
					Reset
				</Button>
			</div>
		),
		filterIcon                    : (filtered) => (
			<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
		),
		onFilter                      : (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownVisibleChange : (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render                        : (text) =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[ this.state.searchText ]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			) : (
				text
			)
	});

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText     : selectedKeys[0],
			searchedColumn : dataIndex
		});
	};

	handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: "" });
	};

	render() {
		let { sortedInfo, filteredInfo } = this.state;
		sortedInfo = sortedInfo || {};
		filteredInfo = filteredInfo || {};
		const columns = [
			{
				title         : "action",
				dataIndex     : "action",
				key           : "action",
				filters       : [ { text: "Updated", value: "updated" }, { text: "Cutoff", value: "cutoff" } ],
				filteredValue : filteredInfo.action || null,
				onFilter      : (value, record) => record.action.includes(value),
				sorter        : (a, b) => a.action.length - b.action.length,
				sortOrder     : sortedInfo.columnKey === "action" && sortedInfo.order,
				ellipsis      : true
			},
			{
				title         : "object",
				dataIndex     : "object",
				key           : "object",
				filters       : [
					{ text: "ingredient", value: "ingredient" },
					{ text: "meal", value: "meal" },
					{ text: "recipe", value: "recipe" },
					{ text: "card", value: "card" },
					{ text: "order", value: "order" }
				],
				//enter test here to check if all of the above are valid/nothing is missing
				filteredValue : filteredInfo.object || null,
				onFilter      : (value, record) => record.object.includes(value),
				sorter        : (a, b) => a.object.length - b.object.length,
				sortOrder     : sortedInfo.columnKey === "object" && sortedInfo.order,
				ellipsis      : true
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
				title     : "object_identifier",
				dataIndex : "object_identifier",
				key       : "object_identifier",
				sorter    : (a, b) => a.object_identifier - b.object_identifier,
				sortOrder : sortedInfo.columnKey === "object_identifier" && sortedInfo.order,
				ellipsis  : true
			},
			{
				title     : "s3_location",
				dataIndex : "s3_location",
				key       : "s3_location",
				sorter    : (a, b) => a.s3_location.length - b.s3_location.length,
				sortOrder : sortedInfo.columnKey === "s3_location" && sortedInfo.order,
				ellipsis  : true,
				...this.getColumnSearchProps("action")
			},
			{
				title     : "View Object in AWS",
				key       : "s3_location_link",
				dataIndex : "s3_location_link",
				render    : (text, record, key, dataIndex) => (
					<span>
						<a href={data} target="_blank">
							View Object
						</a>
					</span>
				)
			}
			//figure out how to enter the right link

			// {
			// 	title     : "TEST",
			// 	dataIndex : "s3_location_link",
			// 	key       : "s3_location_link",
			// 	ellipsis  : true
			// }
		];
		return (
			<div>
				<div className="table-operations">
					<Button onClick={this.setobjectSort}>Sort Object</Button>
					<Button onClick={this.clearFilters}>Clear filters</Button>
					<Button onClick={this.clearAll}>Clear filters and sorters</Button>
				</div>
				<Table columns={columns} dataSource={data} onChange={this.handleChange} />
			</div>
		);
	}
}
export default TableRender;
