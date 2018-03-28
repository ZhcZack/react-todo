import * as React from "react";

interface AlertProps {
	display: boolean;
	message: string;
	onConfirmClicked(e: React.MouseEvent<HTMLButtonElement>): void;
}

export class Alert extends React.Component<AlertProps, {}> {
	render() {
		return (
			<div id="global-alert-background" className={this.props.display ? "display" : ""}>
				<div id="global-alert">
					<p className="alert-message">{this.props.message}</p>
					<p className="alert-actions single-action">
						<button className="confirm" onClick={this.props.onConfirmClicked}>
							好的
						</button>
					</p>
				</div>
			</div>
		);
	}
}
