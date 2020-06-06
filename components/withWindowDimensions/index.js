import React, { Component } from "react";

export default function withWindowDimensions(WrappedComponent) {
    return class extends Component {
        state = { width: 0, height: 0 };

        componentDidMount() {
            this.updateWindowDimensions();
            window.addEventListener("resize", this.updateWindowDimensions);
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.updateWindowDimensions);
        }

        updateWindowDimensions = () => {
            let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
            let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
            this.setState({ width: windowWidth, height: windowHeight });
        };

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    windowWidth={this.state.width}
                    windowHeight={this.state.height}
                    isSmallScreen={this.state.width < 800}
                />
            );
        }
    };
}