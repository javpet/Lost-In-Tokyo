import React from "react";
import ReactDOM from "react-dom";

// Import data
import menu from "./data/menu";
import attractions from "./data/attractions";

const Highlight = props => {
	return (
		<span className={`relative highlight highlight-${props.color}`}>
			<span className="relative z-2">{props.children}</span>
		</span>
	);
};

const Intro = () => {
	return (
		<div className="m-auto-ns f4 f3-m f2-l tc w-80-l normal">
			<div className="mb3 mb4-ns">
				<Highlight color="aqua">Lost in Tokyo</Highlight> is a directory of fun places to see, play in and{" "}
				<Highlight color="yellow">explore</Highlight>, in <Highlight color="blue">Tokyo</Highlight>, Japan.
			</div>

			<div>
				From <Highlight color="blue">museums</Highlight> and <Highlight color="blue">galleries</Highlight>, to
				<Highlight color="pink">Robot Restaurants</Highlight>and
				<Highlight color="pink">kitten cafes</Highlight>, Tokyo is the gift that keeps on giving.{" "}
				<Highlight color="yellow">Dattebayo!</Highlight>
			</div>
		</div>
	);
};

const NavItem = props => {
	return (
		<li className={`mh-2-ns f6 f4-l tc ${props.className}`}>
			<a className="white no-underline" href={props.href}>
				{props.logo ? (
					<img src={require("./images/logo.svg")} alt="Lost In Tokio" className="db center logo" />
				) : (
					props.children
				)}
			</a>
		</li>
	);
};

const Nav = () => {
	return (
		<nav className="pt3 pt4-ns mb4 mb0-ns">
			<ul className="list flex flex-wrap flex-nowrap-ns justify-between items-center pa0 ma0">
				{menu.map(item => {
					return <NavItem key={item.children} {...item} />;
				})}
			</ul>
		</nav>
	);
};

const Overlay = props => {
	return (
		<div
			className="absolute w-100 h-100 flex items-center pa3 pa4-ns bg-aqua overlay"
			style={{ transform: props.showInfo ? "none" : "translateY(-100%)" }}
		>
			<div>
				{props.link ? (
					<a href={props.link}>
						<h1 className="f4 f3-ns mt0 mb2 regular black normal lh-title">{props.title}</h1>
					</a>
				) : (
					<h1 className="f4 f3-ns mt0 mb2 regular black normal lh-title">{props.title}</h1>
				)}
				<p className="lh-title lh-copy-ns mv0 black f6 measure-l">{props.description}</p>
			</div>
		</div>
	);
};

class Attraction extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showInfo: false
		};
	}

	toggleInfo() {
		this.setState({
			showInfo: !this.state.showInfo
		});
	}

	render() {
		return (
			<div
				className={`ph4 ph5-ns ph0-l mb4 mb5-ns w-100 overflow-hidden pointer attraction ${
					this.props.className
				}`}
				onMouseOver={() => this.toggleInfo()}
				onMouseLeave={() => this.setState({ showInfo: false })}
			>
				<div className="relative">
					<Overlay {...this.props} {...this.state} />
					<img src={require(`./images/image_${this.props.index}.jpg`)} className="db" />
				</div>
			</div>
		);
	}
}

const App = () => {
	return (
		<div>
			<div className="min-vh-100 ph4 flex flex-column">
				<Nav />
				<Intro />
			</div>
			<div className="flex flex-wrap container">
				{attractions.map((attraction, index) => (
					<Attraction key={attraction.title} index={index + 1} {...attraction} />
				))}
			</div>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
