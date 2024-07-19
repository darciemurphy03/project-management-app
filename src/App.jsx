import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  // Function to handle adding a task
  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  // Function to handle deleting a task
  function handleDeleteTask(id) {
    setProjectsState(prevState => ({
      ...prevState,
      tasks: prevState.tasks.filter(task => task.id !== id),
    }));
  }

  // Function to handle selecting a project
  function handleSelectProject(id) {
    setProjectsState(prevState => ({
      ...prevState,
      selectedProjectId: id,
    }));
  }

  // Function to handle starting to add a new project
  function handleStartAddProject() {
    setProjectsState(prevState => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  // Function to handle deleting a project
  function handleDeleteProject(id) {
    setProjectsState(prevState => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(project => project.id !== id),
      tasks: prevState.tasks.filter(task => task.projectId !== id),
    }));
  }

  // Function to handle canceling project addition
  function handleCancelAddProject() {
    setProjectsState(prevState => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  // Function to handle adding a new project
  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  // Find the selected project based on the current state
  const selectedProject = projectsState.projects.find(
    project => project.id === projectsState.selectedProjectId
  );

  // Determine what content to show based on the selectedProjectId
  let content;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else {
    content = (
      <SelectedProject
        project={selectedProject}
        onDelete={handleDeleteProject}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        tasks={projectsState.tasks.filter(task => task.projectId === selectedProject.id)}
      />
    );
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProjectId}
        />
        {content}
      </main>
    </>
  );
}

export default App;
