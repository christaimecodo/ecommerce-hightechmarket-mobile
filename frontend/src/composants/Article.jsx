import React from 'react';
import { Button, Image, Text, View } from 'react-native';
import styles from "../styles/article";

export const Article = ({ item, onAddToCart, onShowDetails }) => {
  return (
    <View style={styles.articleContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nom}>{item.name}</Text>
        <Text style={styles.prix}>{item.prix}</Text>

        <View style={styles.actionsRow}>
          <Button
            title="Ajouter"
            onPress={onAddToCart}
            color="#2C2C2C"
          />
          <Button
            title="Détails"
            onPress={onShowDetails}
            color="#2C2C2C"
          />
        </View>
      </View>
    </View>
  );
};


