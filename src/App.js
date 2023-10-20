import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "~/components/Register";
import Layout from "~/components/Layout"
import Author from "~/components/Author"
import Video from "~/components/Video"
import Text from "~/components/Text"
import Profile from "~/components/Profile"
import Lesson from "~/components/Lesson"
import Level from "~/components/Level"
import Subject from "~/components/Subject"
import Point from "~/components/Point"
import Word from "~/components/Word"
import Check from "~/components/Check"
import TextToVideo from "~/components/TextToVideo"
import Score from "~/components/Score"
import LearnByWord from "~/components/LearnByWord"




// import DefaultLayout from "~/components/DefaultLayout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/author" element={<Author />} />
          <Route path="/video" element={<Video />} />
          <Route path="/text" element={<Text />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/lesson/:lessonID" element={<Level />} />
          <Route path="/text/:textID" element={<TextToVideo />} />
          <Route path="/lesson/:lessonID/:lessonID" element={<Score/>} />
          <Route path="/point" element={<Point />} />
          <Route path="/word" element={<Word />} />
          <Route path="/check" element={<Check />} />
          <Route path="/LearnByWord" element={<LearnByWord />} />
        </Routes>
      </div>
    </Router>

  );
}


export default App;
