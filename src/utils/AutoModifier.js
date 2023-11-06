import axios from "axios";
import React from 'react';
import { Button } from "react-bootstrap";

let schemaName = 'movies';
let baseUrl = 'http://localhost:9999/';
let data = [

];

const AutoModifier = () => {

	function updateData() {
		axios.get(baseUrl + schemaName)
			.then((res) => {
				data = res.data;
			})
			.then(() =>
				change()
			)
			.catch((err) => {
				console.log(err);
			})
	}

	async function change() {
		for (let newVal of data) {
			await axios.patch(baseUrl + schemaName + '/' + newVal.id, {
				'view_count': Math.round(newVal.view_count)
			})
				.then((res) => {
					console.log(res.status)
				}).catch((err) => {
					console.log(err)
				});
		}
	}

	return (
		<>
			<h1>
				<Button onClick={updateData}>Update</Button>
			</h1>
		</>
	);
}

export default AutoModifier;
