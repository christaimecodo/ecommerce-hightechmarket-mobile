import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  articleContainer: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  image: { width: 90, height: 90, borderRadius: 8 },
  info: { flex: 1, justifyContent: 'space-between' },
  nom: { fontSize: 16, fontWeight: '600', color: '#333' },
  prix: { fontSize: 14, color: '#2C2C2C', marginBottom: 6 },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
});

export default styles;

