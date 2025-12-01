import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../components/CustomButton";
import Mensaje from "../components/Mensaje";
import { obtenerUsuarios, crearUsuario, resetEstado } from "../redux/postSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { usuarios, success } = useSelector((state) => state.post);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    dispatch(obtenerUsuarios());
  }, []);

  const abrirFormulario = () => setMostrarFormulario(!mostrarFormulario);

  const guardarUsuario = () => {
    if (!nombre || !job) return;

    dispatch(crearUsuario({ nombre, job })).then(() => {
      setNombre("");
      setJob("");
      setMostrarFormulario(false);
      setTimeout(() => dispatch(resetEstado()), 600);
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar backgroundColor="#7f012b" barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>- APP GENERADOR DE USUARIOS -</Text>
          </View>

          <View style={styles.content}>

            {!mostrarFormulario && (
              <>
                <Text style={styles.title}>Listado de Usuarios</Text>

                <ScrollView style={styles.lista}>
                  {usuarios.map((u) => (
                    <View key={u.id} style={styles.card}>
                      <Text style={styles.cardNombre}>{u.first_name}</Text>
                      <Text style={styles.cardEmail}>{u.email}</Text>
                      <Text style={styles.cardJob}>{u.job}</Text>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}

            <CustomButton
              text={mostrarFormulario ? "X" : "Crear usuario"}
              onPress={abrirFormulario}
            />

            {mostrarFormulario && (
              <View style={styles.formulario}>
                <TextInput
                  placeholder="Nombre"
                  style={styles.input}
                  value={nombre}
                  onChangeText={setNombre}
                />
                <TextInput
                  placeholder="Job"
                  style={styles.input}
                  value={job}
                  onChangeText={setJob}
                />
                <CustomButton
                  text="Guardar usuario"
                  onPress={guardarUsuario}
                  backgroundColor="#724032"
                />
              </View>
            )}
          </View>

          <View style={styles.footer} />

          {success && (
            <Mensaje
              tipo="exito"
              mensaje="Usuario creado exitosamente"
              onCerrar={() => dispatch(resetEstado())}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#7f012b",
  },
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    width: "100%",
    paddingVertical: 16,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#7f012b",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#ffe6d1",
    fontSize: 15,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },
  lista: {
    width: "90%",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#7f012b",
    borderRadius: 12,
    padding: 8,
  },
  card: {
    backgroundColor: "#ffe6d1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardNombre: { fontSize: 18, fontWeight: "bold" },
  cardEmail: { fontSize: 14, color: "#777" },
  cardJob: { fontSize: 16, color: "#555" },
  formulario: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#7f012b",
  },
});

