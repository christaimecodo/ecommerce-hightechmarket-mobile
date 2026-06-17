import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles/cartebadge';

const CartBadgeComponent = ({ count, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cartBadge}
      onPress={onPress}
    >
      <Text style={styles.cartText}>🛒 {count}</Text>
    </TouchableOpacity>
  );
};

// Utilisation de React.memo pour éviter les rerenders inutiles
const CartBadge = memo(CartBadgeComponent);

export default CartBadge;
