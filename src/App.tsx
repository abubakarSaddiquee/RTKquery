import { useEffect, useState, useRef } from "react";
import { Modal } from "@mui/material";
import "./App.css";
import {
  useAddContactMutation,
  useContactsQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} from "./services/contactsApi";
import {
  BlobProvider,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import Logo from "./assets/Certificate.png";
import Completion from "./assets/completion.png";
import Of from "./assets/Of.png";
import Typewriter from "typewriter-effect";
import { start } from "repl";

function App() {
  const { data, error, isFetching, isLoading, isSuccess } = useContactsQuery();
  const [allData, setAllData] = useState<any>();
  const [name, setName] = useState<any>("shahzeb");

  useEffect(() => {
    setAllData(data);
  }, [data]);

  console.log("data", allData);

  const [open, setOPen] = useState(false);
  const newFunction = () => {
    console.log("rr");
  };

  return (
    <div style={{ padding: "2rem" }} className="App">
      <button onClick={() => setOPen(!open)}>open Modal</button>
      {open && (
        <div className="modal">
          <HTMLToPDF />
        </div>
      )}

      <h1>
        React Redux Toolkit RTK Query
        <span
          style={{
            background: "#5b5bd9",
            color: "white",
            padding: "10px",
            borderRadius: "15px",
          }}
        >
          CRUD APP
        </span>
      </h1>
      {isLoading && <h2>...Loading</h2>}
      {error && <h2>Somthing is wwent rong !</h2>}
      {isFetching && <h2>...Fetching</h2>}
      {isSuccess && (
        <div>
          {data.map((item: any) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  background: "#7f2c2c",
                  marginTop: "2rem",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                <p>{item.id}</p>
                <p>{item.name}</p>
                <p>{item.author}</p>
              </div>
            );
          })}
        </div>
      )}
      <AddContact />
      
      <h1 className="typewriter-style">
      <p>{name}</p>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Shahzeb is a developer")
              .callFunction(() => {
                setTimeout(() => {
                  setName("Salman");
                }, 2500);
              })
              .pauseFor(1000)
              .deleteAll()
              .typeString("Salman is a React developer")
              .callFunction(() => {
                setTimeout(() => {}, 2500);
              })
              .pauseFor(1000)
              .start();
          }}
        />
      </h1>
    </div>
  );
}
export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const [DeleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const contact = {
    id: "3",
    name: "json-server 3",
    author: "typicode 3",
  };

  const updateContacts = {
    id: "3",
    name: "Abubakar",
    author: "Saddiq",
  };

  const addHandler = async () => {
    await addContact(contact);
  };

  const updateHAndler = async () => {
    await updateContact(updateContacts);
  };

  const deleteHandler = async () => {
    await DeleteContact(contact.id);
  };

  return (
    <div>
      <button onClick={addHandler}>ADD Contact</button>
      <button onClick={updateHAndler}>UPDATE Contact</button>
      <button onClick={deleteHandler}>DELETE Contact</button>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    position: "relative",
    width: "841px",
    height: "800px",
  },
  section: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "relative",
    width: "841px",
    height: "841px",

    zIndex: -1,
  },
  certificate: {
    fontSize: 42,
    fontWeight: 600,
    marginBottom: "21px",
  },
  of: {
    fontSize: 40,
    fontWeight: 400,
    marginBottom: "24px",
  },
  comoletion: {
    marginBottom: "14px",
    width: "290px",
    height: "23px",
  },
  presentTo: {
    fontSize: 20,
    fontWeight: 300,
    marginBottom: "27px",
  },
  name: {
    fontSize: 38,
    fontWeight: 500,
    marginBottom: "41px",
  },
  course: {
    fontSize: 18,
    fontWeight: 300,
    marginBottom: "10px",
  },
  courseDate: {
    fontSize: 18,
    fontWeight: 300,
    marginBottom: "20px",
  },
  at: {
    fontSize: 14,
    fontWeight: 300,
    marginBottom: "15px",
  },
  facilitator: {
    fontSize: 14,
    fontWeight: 300,
    marginBottom: "20px",
  },
  facilitatorDate: {
    fontSize: 20,
    fontWeight: 400,
    marginBottom: "20px",
  },
});

const HTMLToPDF = () => {
  return (
    <BlobProvider
      document={
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.certificate}>Certificate</Text>
              {/* <Text style={styles.of}>Of</Text> */}
              <Text style={styles.of}>
                <Image src={Of} />
              </Text>
              {/* <Text style={styles.comoletion}>COMPLETION</Text> */}

              <Image src={Completion} style={styles.comoletion} />

              <Text style={styles.presentTo}>Proudly Presented To</Text>
              <Text style={styles.name}>Clare O’Roberts</Text>
              <Text style={styles.course}>
                Attended the course Social Care Network on:
              </Text>
              <Text style={styles.courseDate}>10/09/2017 - 15/09/2017</Text>
              <Text style={styles.at}>At: East ChinaTraining Ground</Text>
              <Text style={styles.facilitator}>
                Facilitator: ClareFacilitator Roberts
              </Text>
              <Text style={styles.facilitatorDate}>27 . 10 . 2021</Text>
            </View>
            <Image src={Logo} style={styles.image} />
          </Page>
        </Document>
      }
    >
      {({ blob, url, loading, error }) =>
        loading
          ? "Loading document..."
          : blob && (
              <embed
                src={URL.createObjectURL(blob)}
                type="application/pdf"
                style={{ width: "841px", height: "821px" }}
              />
            )
      }
    </BlobProvider>
  );
};

export default App;
