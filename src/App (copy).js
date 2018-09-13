import React, { Component } from "react";
import "./App.css";

class App extends Component {
	state = {
		attendencePercent: " ",
		classesToAttend: " ",
		criteria: " ",
		lecturesHeld: " ",
		bunkedLectures: " ",
		checkInput: false
	};

	lecturesHeldRef = React.createRef();
	bunkedRef = React.createRef();
	attendedRef = React.createRef();
	marginRef = React.createRef();

	getAttendance = event => {
		event.preventDefault();
		// eslint-disable-next-line
		const lecturesHeld = parseInt(this.lecturesHeldRef.current.value);

		if (lecturesHeld === 0) {
			this.setState({
				lecturesHeld: 0
			});
		}
		// eslint-disable-next-line
		const criteria = parseInt(this.marginRef.current.value);
		if (this.state.checkInput === true) {
			console.log("bunked");
			// eslint-disable-next-line
			const bunked = parseInt(this.bunkedRef.current.value);
			// eslint-disable-next-line
			const lecturesAttended = parseInt(lecturesHeld - bunked);
			// eslint-disable-next-line
			const attendencePercent = parseFloat(
				((lecturesAttended * 100) / lecturesHeld).toFixed(2)
			);
			// eslint-disable-next-line
			const classesToAttend = parseInt(
				(criteria * lecturesHeld - lecturesAttended * 100) / (100 - criteria)
			);
			this.setState({
				attendencePercent,
				criteria,
				lecturesHeld,
				classesToAttend,
				bunkedLectures: bunked
			});
		} else {
			console.log("attended");
			// eslint-disable-next-line
			const lecturesAttended = parseInt(this.attendedRef.current.value);
			// eslint-disable-next-line
			const attendencePercent = parseFloat(
				((lecturesAttended * 100) / lecturesHeld).toFixed(2)
			);
			// eslint-disable-next-line
			const classesToAttend = parseInt(
				(criteria * lecturesHeld - lecturesAttended * 100) / (100 - criteria)
			);
			this.setState({
				attendencePercent,
				criteria,
				lecturesHeld,
				classesToAttend
			});
		}
	};

	render() {
		let content;
		const {
			attendencePercent,
			classesToAttend,
			criteria,
			lecturesHeld,
			bunkedLectures
		} = this.state;

		if (bunkedLectures > lecturesHeld) {
			content = (
				<div className="message">
					<span role="img" aria-label="laugh">
						🤣
					</span>{" "}
					Are You Crazy ? Total lectures held must be more than bunked lectures
					!
				</div>
			);
		}

		if (classesToAttend > 0 && bunkedLectures <= lecturesHeld) {
			content = (
				<div className="message">
					<div>
						<i className="material-icons">warning</i>
					</div>
					<span role="img" aria-label="sad">
						😵
					</span>{" "}
					You have only <b className="element"> {attendencePercent}%</b> of
					attendance and You must attend next{" "}
					<b className="element">{classesToAttend + 1} lectures</b> to maintain
					the min of {criteria}% attendance.
				</div>
			);
		}
		if (classesToAttend <= -1) {
			const check = criteria / (100 - criteria);
			/*eslint-disable */
			const lectBunked = parseInt((-1 * classesToAttend) / check);
			/*eslint-enable */
			content = (
				<div className="message">
					<span role="img" aria-label="happy">
						😁
					</span>{" "}
					You have <b className="element">{attendencePercent}%</b> of
					attendance. You can bunk{" "}
					<b className="element">{lectBunked} lectures</b> more. Enjoy !
				</div>
			);
		}
		if (classesToAttend === 0) {
			content = (
				<div className="message">
					You have <b className="element">{attendencePercent}%</b> of
					Attendance. Lucky AF !
				</div>
			);
		}

		return (
			<div className="container">
				<form onSubmit={this.getAttendance}>
					<h1 className="title">Bunk Māḍi !</h1>

					<input
						className="inputStyle"
						placeholder="Total Lectures Held"
						type="number"
						pattern="[0-9]*"
						inputMode="numeric"
						required
						ref={this.lecturesHeldRef}
						name="lecturesheld"
					/>
					<div className="fullContainer">
						<div className="buttonItems">
							<button
								style={
									this.state.checkInput
										? {
												border: "1px solid rgba(255, 255, 255, 0.9)",
												boxShadow: "0 8px 20px 0 rgba(0, 0, 0, 0.1)"
										  }
										: { border: "none" }
								}
								className="optionalButton"
								type="button"
								onClick={() => this.setState({ checkInput: true })}>
								BL
							</button>
							<button
								style={
									this.state.checkInput
										? { border: "none" }
										: {
												border: "1px solid rgba(255, 255, 255, 0.9)",
												boxShadow: "0 8px 20px 0 rgba(0, 0, 0, 0.1)"
										  }
								}
								className="optionalButton"
								type="button"
								onClick={() =>
									this.setState({ checkInput: false, bunkedLectures: "" })
								}>
								AL
							</button>
						</div>
						<div className="inputItems">
							{this.state.checkInput ? (
								<input
									className="optionalInput"
									placeholder="Bunked Lectures"
									type="number"
									pattern="[0-9]*"
									inputMode="numeric"
									required
									ref={this.bunkedRef}
									name="bunked"
								/>
							) : (
								<input
									className="optionalInput"
									placeholder="Attended Lectures"
									type="number"
									pattern="[0-9]*"
									inputMode="numeric"
									required
									ref={this.attendedRef}
									name="attended"
								/>
							)}
						</div>
					</div>
					<input
						style={{ marginTop: 20 }}
						className="inputStyle"
						placeholder="Min %"
						type="number"
						pattern="[0-9]*"
						inputMode="numeric"
						required
						defaultValue={75}
						ref={this.marginRef}
						name="margin"
					/>
					<button className="button raised buttonStyle" type="submit">
						evaluate
					</button>

					{content}
				</form>
			</div>
		);
	}
}

export default App;
