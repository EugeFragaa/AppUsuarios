import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";

export default function Home() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [job, setJob] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const abrirFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  // GET: Cargar usuarios desde ReqRes
  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setUsuarios(data.data);
        } else {
          setUsuarios([]);
        }
      })
      .catch(() => setUsuarios([]));
  }, []);

  // POST: Crear usuario nuevo
  const guardarUsuario = () => {
    if (!nombre || !job) return;

    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nombre, job }),
    })
      .then((res) => res.json())
      .then((data) => {
        const nuevo = {
          id: Date.now(),
          first_name: data.name,
          last_name: "",
          email: "",
          job: data.job,
        };

        setUsuarios([nuevo, ...usuarios]);
        setNombre("");
        setJob("");
        setMostrarFormulario(false);
      })
      .catch(() => {});
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Generador de Usuarios App</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Listado de usuarios</Text>

        <ScrollView style={styles.lista}>

          {Array.isArray(usuarios) &&
            usuarios.map((u) => (
              <View key={u.id} style={styles.card}>
                
                <Text style={styles.cardNombre}>
                  {u.first_name || u.name}
                </Text>

                <Text style={styles.cardJob}>
                  {u.last_name || u.job}
                </Text>

                <Text style={styles.cardEmail}>
                  {u.email}
                </Text>

              </View>
            ))}

        </ScrollView>

        <CustomButton
          text={mostrarFormulario ? "Cerrar formulario" : "Crear usuario"}
          onPress={abrirFormulario}
          backgroundColor="#7b2cbf"
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
              backgroundColor="#4caf50"
            />
          </View>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },

  header: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
  },

  headerText: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  content: { flex: 1, alignItems: "center", marginTop: 20 },

  title: { fontSize: 24, fontWeight: "700", color: "#333", marginBottom: 15 },

  lista: { width: "90%", marginBottom: 20 },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  cardNombre: { fontSize: 18, fontWeight: "bold" },

  cardJob: { fontSize: 16, color: "#555" },

  cardEmail: { fontSize: 14, color: "#777" },

  formulario: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
});
