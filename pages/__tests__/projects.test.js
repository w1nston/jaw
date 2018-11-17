import React from 'react';
import { cleanup, render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Projects from '../projects';

describe('project page', () => {
  afterEach(cleanup);
  test('renders a title', () => {
    const { getByTestId } = render(<Projects />);
    const title = getByTestId('projects-title-h1');
    expect(title).toHaveTextContent('Projects');
  });
});

describe('project page with a project', () => {
  afterEach(cleanup);

  test('renders a project title', () => {
    const title = 'Project Title';
    const projects = [
      {
        description: [],
        sourceCodeLocations: [],
        title,
      },
    ];
    const { getByTestId } = render(<Projects projects={projects} />);
    const projectTitle = getByTestId('projects-projectTitle-h2');
    expect(projectTitle).toHaveTextContent(title);
  });

  test('renders a link to a live demo', () => {
    const link = 'https://live-demo.now/';
    const projects = [
      {
        description: [],
        link,
        sourceCodeLocations: [],
      },
    ];
    const { getByText } = render(<Projects projects={projects} />);
    const liveDemoLink = getByText(/Live Demo/i);
    expect(liveDemoLink.href).toBe(link);
  });

  test('renders a description', () => {
    const paragraph = 'description text';
    const description = [paragraph];
    const projects = [
      {
        description,
        sourceCodeLocations: [],
      },
    ];
    const { getByTestId } = render(<Projects projects={projects} />);
    const descriptionContainer = getByTestId('projects-description-div');
    expect(descriptionContainer).toHaveTextContent(paragraph);
  });

  test('renders source code links', () => {
    const sourceCodeUrl = 'https://github.com/somwhere';
    const sourceCodeLocations = [sourceCodeUrl];
    const projects = [
      {
        description: [],
        sourceCodeLocations,
      },
    ];
    const { getByTestId } = render(<Projects projects={projects} />);
    const sourceCodeContainer = getByTestId('projects-sourceCodeTitle-h3');
    const sourceCodeList = getByTestId('projects-sourceCodeList-ul');
    expect(sourceCodeContainer).toHaveTextContent('Source');
    expect(sourceCodeList).toHaveTextContent(sourceCodeUrl);
  });
});
