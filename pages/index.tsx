import { Editor, Frame, Element } from '@craftjs/core';
import { createMuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LayersIcon from '@material-ui/icons/Layers';
import Link from '@material-ui/core/Link';
import dynamic from 'next/dynamic';
import { Allotment } from "allotment";
import { ThemeProvider } from '@material-ui/core/styles';
import { NextSeo } from 'next-seo';
import React, {useEffect, useRef,useState} from 'react';
import {BrowserTabs, Dark} from 'react-browser-tabs';


import { Viewport, RenderNode } from '../components/editor';
import { Container, Text } from '../components/selectors';
import { Button } from '../components/selectors/Button';
import { Custom1, OnlyButtons } from '../components/selectors/Custom1';
import { Custom2, Custom2VideoDrop } from '../components/selectors/Custom2';
import { Custom3, Custom3BtnDrop } from '../components/selectors/Custom3';
import { Video } from '../components/selectors/Video';
import { Image } from '../components/selectors/Image';
import defaultTemplate from '../public/templates/template1.json';
import {generateRandomString, generateRandomClassName} from '../utils/text';

const CodeEditor = dynamic(
  () => import('@codeium/react-code-editor').then((mod) => mod.CodeiumEditor),
  { ssr: false }
);

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'acumin-pro',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`
  );
  const [jsonData, setJsonData] = useState(null);
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setJsonData(json);
        } catch (err) {
          alert("Error parsing JSON file");
        }
      };

      reader.readAsText(file);
    } else {
      alert("Please upload a valid JSON file.");
    }
  };
  const defaultSelector = 'workspace-1';
  const defaultTabs = [
    {
      title: 'Workspace 1',
      id: generateRandomString(10),
      content: () => (
        <ThemeProvider theme={theme}>
          <div className="h-full h-screen" style={{marginTop: '99px'}}>
            <NextSeo
              title="Nex Page Builder"
              description="A NextJs Page Builder."
              canonical="https://gto-wedding-page-builder.netlify.app"
              twitter={{
                site: 'https://gto-wedding-page-builder.netlify.app',
                cardType: 'summary_large_image',
              }}
            />
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            <Editor
              resolver={{
                Container,
                Text,
                Custom1,
                Custom2,
                Custom2VideoDrop,
                Custom3,
                Custom3BtnDrop,
                OnlyButtons,
                Button,
                Video,
                Image
              }}
              enabled={false}
              onRender={RenderNode(defaultSelector)}
            >
              <Viewport selector={defaultSelector}>
                <Frame data={JSON.stringify(defaultTemplate)} />
              </Viewport>
            </Editor>
          </div>
        </ThemeProvider>
      )
    }
  ]
  const tabs = useState(defaultTabs)
  const activeTab = useState(0)
  const addTab = (jsonData = null) => {
    const selector = 'workspace-'+(tabs[0].length+1);
    activeTab[1](tabs[0].length)
    tabs[1]([
      ...tabs[0],
      {
        title: 'Workspace '+(tabs[0].length+1),
        id: generateRandomString(10),
        content: () => (
          <ThemeProvider theme={theme}>
            <div className="h-full h-screen" style={{marginTop: '99px'}}>
              <NextSeo
                title="Nex Page Builder"
                description="A NextJs Page Builder."
                canonical="https://gto-wedding-page-builder.netlify.app"
                twitter={{
                  site: 'https://gto-wedding-page-builder.netlify.app',
                  cardType: 'summary_large_image',
                }}
              />
              <Editor
                resolver={{
                  Container,
                  Text,
                  Custom1,
                  Custom2,
                  Custom2VideoDrop,
                  Custom3,
                  Custom3BtnDrop,
                  OnlyButtons,
                  Button,
                  Video,
                  Image
                }}
                enabled={false}
                onRender={RenderNode(selector)}
              >
                <Viewport selector={selector}>
                  {jsonData !== null ? (
                      <Frame data={JSON.stringify(jsonData)} />
                    ) : (
                      <Frame>
                        <Element
                          canvas
                          is={Container}
                          width="800px"
                          height="450px"
                          background={{ r: 255, g: 255, b: 255, a: 1 }}
                          padding={['40', '40', '40', '40']}
                          custom={{ displayName: 'App' }}
                        />
                      </Frame>
                  )}
                </Viewport>
              </Editor>
            </div>
          </ThemeProvider>
        )
      }
    ])
  }

  useEffect(() => {
    if (jsonData) {
      addTab(jsonData);
    }
  }, [jsonData]);
  
  const handleAddNewTab = () => {
    addTab();
  };
  const classes = useStyles();

  const handleEditorChange = (code) => {
    console.log('Code changed:', code);
  };

  const addCodeEditorTab = () => {
    activeTab[1](tabs[0].length)
    tabs[1]([
      ...tabs[0],
      {
        title: 'Code Editor',
        id: generateRandomString(10),
        content: () => (
          <div className="h-full h-screen" style={{ marginTop: '100px' }}>
            
            <Allotment>
            <Allotment.Pane>
              <CodeEditor
                height="100%"
                language="html"
                value="// Your code here"
                theme="vs-dark"
                onChange={handleEditorChange}
              />
            </Allotment.Pane>
            <Allotment.Pane>
              <div></div> 
            </Allotment.Pane>
            </Allotment>
          </div>
        )
      }
    ])
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
       
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <LayersIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Nex Page Builder
          </Typography>
      
          <div style={{display:'flex',justifyContent:'end'}}>
          <Link
            style={{ color : '#fff'}}
            component="button"
            variant="body2"
            underline="none"
            onClick={() => {
              triggerFileInput();
            }}
          >
            Open Template
          </Link>
          <Link
            style={{ color : '#fff',  marginLeft:'10px'}}
            component="button"
            variant="body2"
            underline="none"
            onClick={() => {
              addCodeEditorTab();
            }}
          >
            Code Editor
          </Link>
          <Link
            style={{ color : '#fff',  marginLeft:'10px'}}
            component="button"
            variant="body2"
            underline="none"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Templates
          </Link>
          <Link
            style={{ color : '#fff', marginLeft:'10px'}}
            component="button"
            variant="body2"
            underline="none"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Docs
          </Link>
          <Link
            style={{ color : '#fff', marginLeft:'10px'}}
            component="button"
            variant="body2"
            underline="none"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            About
          </Link>
          </div>
          
        </Toolbar>
      </AppBar>

      <BrowserTabs
        onAddTabPress={handleAddNewTab}
        theme={Dark} 
        activeTab={activeTab}
        tabs={tabs}
      />
    </div>
    
  );
}

export default App;
