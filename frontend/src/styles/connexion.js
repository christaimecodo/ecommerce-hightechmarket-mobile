// ============================================================
// connexion.js — Styles visuels de cet ecran (couleurs, marges, tailles)
// ============================================================
// Dans React Native, les styles remplacent le CSS du web.
// On les definit avec StyleSheet.create({ ... })
// On les applique sur un composant avec : style={styles.nomDeLaCle}
// ============================================================

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  page:{flex:1,backgroundColor:'#F4F4F4'},
  menuContainer:{width:'100%',backgroundColor:'#fff',paddingVertical:6,borderBottomWidth:1,borderBottomColor:'#ccc'},
  menuWrapper:{maxHeight:80},
  menu:{paddingHorizontal:10,alignItems:'center'},
  button:{backgroundColor:'#2C2C2C',paddingVertical:10,paddingHorizontal:12,borderRadius:6,marginHorizontal:6,marginVertical:6},
  buttonText:{color:'#fff',fontSize:14},
  conteneur:{marginTop:12,marginHorizontal:16,backgroundColor:'#fff',paddingTop:10,paddingHorizontal:40,paddingBottom:40,borderRadius:10,borderWidth:1,borderColor:'#ccc',flex:1},
  scrollView:{flex:1},
  scrollContent:{paddingBottom:24},
  header:{marginBottom:16,alignItems:"center"},
  titre:{fontSize:20,fontWeight:"600",marginBottom:4,color:"#333", textAlign:"center"},
  sousTitre:{color:"#555"},
  champContainer:{marginBottom:12},
  label:{fontSize:14,marginBottom:6,color:'#333'},
  input:{borderWidth:1,borderColor:"#aaa",borderRadius:6,paddingHorizontal:12,paddingVertical:10,backgroundColor:"#fff",fontSize:14},
  texteErreur:{color:"#FF3B30",marginTop:4,fontSize:12},
});

export default styles;