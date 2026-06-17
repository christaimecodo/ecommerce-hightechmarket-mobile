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

  conteneur: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 40,
    paddingBottom: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  titre: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
  },
  sousTitre: { textAlign: 'center', color: '#555', fontSize: 14, marginBottom: 16 },

  // Bouton changeant
  toggleBtn: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    minWidth: 180,
    alignItems: 'center',
  },
  btnPrimary: { backgroundColor: '#2C2C2C' }, // état "Se connecter"
  btnDanger:  { backgroundColor: '#FF3B30' }, // état "Se déconnecter"
  toggleText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default styles;
