import React, { Component } from "react";
import "./App.css";

class App extends Component {
	state = {
		attendancePercentage: " ",
		classesToAttend: ""
	};

	attendedRef = React.createRef();
	bunkedRef = React.createRef();
	marginRef = React.createRef();

	getAttendance = event => {
		event.preventDefault();
		/*eslint-disable */
		const attended = parseInt(this.attendedRef.current.value);
		const bunked = parseInt(this.bunkedRef.current.value);
		const margin = parseInt(this.marginRef.current.value);
		/*eslint-enable */
		const attendancePercentage = parseFloat(
			100 - (bunked / attended) * 100
		).toFixed(1);
		const classesToAttend = Math.ceil(
			((attendancePercentage - margin) / 100) * attended
		);
		this.setState({
			attendancePercentage,
			classesToAttend
		});
	};

	render() {
		let content;
		if (this.state.classesToAttend !== "") {
			if (this.state.classesToAttend <= -1) {
				content = (
					<div className="message">
						<span role="img" aria-label="sad">
							😵
						</span>{" "}
						You have only{" "}
						<b className="element"> {this.state.attendancePercentage}%</b> of
						attendance and You have to attend{" "}
						<b className="element">{this.state.classesToAttend * -1}</b> more
						classes to maintain the min attendance.
					</div>
				);
			} else if (this.state.classesToAttend > 0) {
				content = (
					<div className="message">
						<span role="img" aria-label="happy">
							😁
						</span>{" "}
						You have{" "}
						<b className="element">{this.state.attendancePercentage}%</b> of
						attendance. You can bunk{" "}
						<b className="element">{this.state.classesToAttend}</b> more
						classes. Enjoy !
					</div>
				);
			} else if (this.state.classesToAttend === 0) {
				content = <div className="message">Oh !!! Lucky AF !</div>;
			} else {
				return;
			}
		}

		return (
			<div className="App">
				<form onSubmit={this.getAttendance}>
					<h1>Bunk Māḍi !</h1>

					<input
						placeholder="Total Lectures"
						type="number"
						pattern="[0-9]*"
						inputMode="numeric"
						required
						ref={this.attendedRef}
						name="attended"
					/>
					<input
						placeholder="Bunked Lectures"
						type="number"
						pattern="[0-9]*"
						inputMode="numeric"
						required
						ref={this.bunkedRef}
						name="bunked"
					/>
					<input
						placeholder="Min %"
						type="number"
						pattern="[0-9]*"
						inputMode="numeric"
						required
						defaultValue={75}
						ref={this.marginRef}
						name="margin"
					/>
					<button type="submit">Calculate</button>

					{content}
				</form>
			</div>
		);
	}
}

export default App;
