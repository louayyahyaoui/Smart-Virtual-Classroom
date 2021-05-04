type CollisionType = 'fit' | 'flip';

interface CollisionStrategy {
    horizontal: CollisionType;
    vertical: CollisionType;
}

export default CollisionStrategy;
