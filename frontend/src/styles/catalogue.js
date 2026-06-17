import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F4F4F4' },

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

  // 🔍 Styles de la barre de recherche
  searchContainer: {
    paddingHorizontal: 12,
    paddingBottom: 4,
  },

  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  conteneur: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
  },

  titre: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },

  list: { padding: 8, paddingTop: 0 },
});

export default styles;
