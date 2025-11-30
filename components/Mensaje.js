import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Mensaje({ tipo = "info", mensaje, onCerrar }) {
  
  const colores = {
    exito: "#4CAF50",
    error: "#f44336",
    info: "#2196F3",
    warning: "#FF9800",
  };

  return (
    <View style={styles.overlay}>
      <View style={[styles.caja, { borderLeftColor: colores[tipo] }]}>
        
        <Text style={styles.texto}>{mensaje}</Text>

        <TouchableOpacity style={styles.boton} onPress={onCerrar}>
          <Text style={styles.botonTexto}>Cerrar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  caja: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 10,
    borderLeftWidth: 8,
  },
  texto: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  boton: {
    backgroundColor: "#724032",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
  }
});
