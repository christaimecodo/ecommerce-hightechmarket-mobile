import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F4F4F4' },

  // Menu
  menuContainer: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuWrapper: { maxHeight: 80 },
  menu: { paddingHorizontal: 10, alignItems: 'center' },
  button: {
    backgroundColor: '#2C2C2C',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 6,
    marginVertical: 6,
  },
  buttonText: { color: '#fff', fontSize: 14 },

  // Carte
  conteneur: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
  },
  titre: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },

  // Liste
  list: { paddingTop: 4 },

  cartItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  cartItemText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },

  cartItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },

  empty: { textAlign: 'center', color: '#555', marginTop: 12 },
});


export default styles;
