import React, { Component } from "react";
import "./App.css";

class App extends Component {
	state = {
		attendencePercent: " ",
		classesToAttend: "",
		criteria: ""
	};

	lecturesHeldRef = React.createRef();
	bunkedRef = React.createRef();
	marginRef = React.createRef();

	getAttendance = event => {
		event.preventDefault();
		/*eslint-disable */

		const lecturesHeld = parseInt(this.lecturesHeldRef.current.value);
		const bunked = parseInt(this.bunkedRef.current.value);
		const criteria = parseInt(this.marginRef.current.value);
		const lecturesAttended = parseInt(lecturesHeld - bunked);
		const attendencePercent = parseFloat(
			((lecturesAttended * 100) / lecturesHeld).toFixed(2)
		);
		const classesToAttend =
			(criteria * lecturesHeld - lecturesAttended * 100) / (100 - criteria);
		/*eslint-enable */

		this.setState({
			attendencePercent,
			classesToAttend,
			criteria
		});
	};

	render() {
		let content;

		if (this.state.classesToAttend > 0) {
			if (
				this.state.lecturesAttended === this.state.lecturesHeld ||
				this.state.criteria !== 100
			) {
				content = (
					<div className="message">
						<div>
							<i className="material-icons">warning</i>
						</div>
						<span role="img" aria-label="sad">
							😵
						</span>{" "}
						You have only{" "}
						<b className="element"> {this.state.attendencePercent}%</b> of
						attendance and You should attend next{" "}
						<b className="element">{this.state.classesToAttend + 1}</b> lectures
						to maintain the min attendance.
					</div>
				);
			}
		}
		if (this.state.classesToAttend <= -1) {
			const check = this.state.criteria / (100 - this.state.criteria);
			/*eslint-disable */
			const lectBunked = parseInt((-1 * this.state.classesToAttend) / check);
			/*eslint-enable */
			content = (
				<div className="message">
					<span role="img" aria-label="happy">
						😁
					</span>{" "}
					You have <b className="element">{this.state.attendencePercent}%</b> of
					attendance. You can bunk <b className="element">{lectBunked}</b> more
					lectures. Enjoy !
				</div>
			);
		}
		if (this.state.classesToAttend === 0) {
			content = (
				<div className="message">
					You have {this.state.attendencePercent}% of Attendace. Lucky AF !
				</div>
			);
		}

		return (
			<div className="app">
				<form onSubmit={this.getAttendance}>
					<h1>Bunk Māḍi !</h1>

					<input
						placeholder="Total Lectures Held"
						type="number"
						pattern="[0-9]*"
						inputMode="numeric"
						required
						ref={this.lecturesHeldRef}
						name="lecturesheld"
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
					<button className="button raised" type="submit">
						evaluate
					</button>

					{content}
				</form>
			</div>
		);
	}
}

export default App;
