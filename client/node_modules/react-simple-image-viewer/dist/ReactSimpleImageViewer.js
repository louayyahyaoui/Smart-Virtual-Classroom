"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styles_1 = require("./styles");
class ReactSimpleImageViewer extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleWheel = this.handleWheel.bind(this);
        this.callOnClose = this.callOnClose.bind(this);
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('wheel', this.handleWheel);
        this.state = {
            currentIndex: this.props.currentIndex === undefined
                ? 0
                : this.props.currentIndex,
        };
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('wheel', this.handleWheel);
    }
    changeImage(direction) {
        let nextIndex = this.state.currentIndex + direction;
        if (nextIndex > this.props.src.length - 1) {
            nextIndex = 0;
        }
        else if (nextIndex < 0) {
            nextIndex = this.props.src.length - 1;
        }
        this.setState({
            currentIndex: nextIndex,
        });
    }
    callOnClose() {
        if (this.props.onClose !== undefined) {
            this.props.onClose();
        }
    }
    handleKeyDown(event) {
        if (event.key === 'Escape') {
            this.callOnClose();
        }
        if (['ArrowLeft', 'h'].includes(event.key)) {
            this.changeImage(-1);
        }
        if (['ArrowRight', 'l'].includes(event.key)) {
            this.changeImage(1);
        }
    }
    handleClick(event) {
        if (event.target && event.target.id === 'ReactSimpleImageViewer') {
            this.callOnClose();
        }
    }
    handleWheel(event) {
        if (event.wheelDeltaY > 0) {
            this.changeImage(-1);
        }
        else {
            this.changeImage(1);
        }
    }
    render() {
        const { src } = this.props;
        const { currentIndex } = this.state;
        return (react_1.default.createElement(styles_1.Wrapper, { id: "ReactSimpleImageViewer", onKeyDown: this.handleKeyDown, onClick: this.handleClick, className: "react-simple-image-viewer__modal", style: this.props.backgroundStyle },
            react_1.default.createElement(styles_1.Close, { className: "react-simple-image-viewer__close", onClick: this.callOnClose }, "\u00D7"),
            src.length > 1 && react_1.default.createElement(styles_1.Prev, { className: "react-simple-image-viewer__previous", onClick: () => this.changeImage(-1) }, "\u276E"),
            src.length > 1 && react_1.default.createElement(styles_1.Next, { className: "react-simple-image-viewer__next", onClick: () => this.changeImage(1) }, "\u276F"),
            react_1.default.createElement(styles_1.Content, { className: "react-simple-image-viewer__modal-content" },
                react_1.default.createElement(styles_1.Slide, { className: "react-simple-image-viewer__slide" },
                    react_1.default.createElement(styles_1.Image, { src: src[currentIndex], alt: "" })))));
    }
}
exports.default = ReactSimpleImageViewer;
//# sourceMappingURL=ReactSimpleImageViewer.js.map