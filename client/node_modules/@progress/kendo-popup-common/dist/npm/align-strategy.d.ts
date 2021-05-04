type HorizontalPoint = 'left' | 'center' | 'right';
type VerticalPoint = 'top' | 'center' | 'bottom';

interface AlignStrategy {
    horizontal: HorizontalPoint;
    vertical: VerticalPoint;
}

export default AlignStrategy;
