import React, {Component} from "react";
import {Snackbar} from "@mui/material";

interface ErrorBoundaryProps {
    children: React.ReactElement
}

interface ErrorBoundaryState {
    hasError: boolean
    errorMessage: string
}


class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {hasError: false, errorMessage: ""}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error: ', error, errorInfo);
        this.setState({ hasError: true, errorMessage: error.message });
    }

    render() {
        return(
            <>
                <Snackbar
                    open={this.state.hasError}
                    onClose={() => this.setState({ hasError: false, errorMessage: "" })}
                    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                    message={this.state.errorMessage}
                />
                {this.props.children}
            </>
        )
    }
}

export default ErrorBoundary

