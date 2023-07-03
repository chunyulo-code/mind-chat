# 0.1.0 (2023-07-03)

### Bug Fixes

- **canvas.tsx:** correct the types of ctx and canvasTypes ([3ccd92a](https://github.com/chunyulo-code/mind-chat/commit/3ccd92aa81dfe76834f183e3f4e774e74c1cfaa0))
- **counter:** fix the importing name of counter reducer ([96e56ea](https://github.com/chunyulo-code/mind-chat/commit/96e56ea047c6f1323c1c4b95e348878af4a57b03))
- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))
- due to the lack of support for React 18 in react-split-pane-next, switched to Allotment instead ([3f6e1c2](https://github.com/chunyulo-code/mind-chat/commit/3f6e1c2827888d7a55e5eb8e1c783984247e7459))
- fix all bugs about types ([971a28e](https://github.com/chunyulo-code/mind-chat/commit/971a28ea8cf02a821cafacff8154e4743863800b))
- minor update the Flow component's useEffect function to make the initialNodes rendered ([73c707d](https://github.com/chunyulo-code/mind-chat/commit/73c707d5a2006802d49894e1cc9673a653c1ac23))
- **page.tsx:** create SplitPane and Pane's children types in node_modules folder ([a102301](https://github.com/chunyulo-code/mind-chat/commit/a102301e1a192624450427867b64553254c69773))
- re-write a react-split-pane-next.d.ts file at root folder named types ([56f0682](https://github.com/chunyulo-code/mind-chat/commit/56f06822e3effe6eb0981242e61610921bd1c068))
- upadate .gitignore and API Key ([3db6723](https://github.com/chunyulo-code/mind-chat/commit/3db67236a2d475c95d72c7bb74262480a33a9574))

### Features

- add NodeToolbar to node element ([fe148ed](https://github.com/chunyulo-code/mind-chat/commit/fe148ed2ae0bf5cb461bd0385cfbe82f4476abe3))
- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- all nodes can auto-layout when ChatGPT's response is done ([b06f40d](https://github.com/chunyulo-code/mind-chat/commit/b06f40d2d00473c79be25a8690187c34c7d841b6))
- confirm the data from redux is great ([d69ba9b](https://github.com/chunyulo-code/mind-chat/commit/d69ba9bc371ae7fb9a60cb484dd73f43d8662440))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))
- integrating ChatGPT and Reactflow ([f096b50](https://github.com/chunyulo-code/mind-chat/commit/f096b50d6f1e370dc8b64123527b3d91ab955ac8))
- integrating Edges in Flow component when ChatGPT responsing ([64a076c](https://github.com/chunyulo-code/mind-chat/commit/64a076cc5b388b9ef8cd6e9acd7074b85bc63972))
- integrating right bar and toolbar at the bottom to the map page ([f507146](https://github.com/chunyulo-code/mind-chat/commit/f507146b8f5246434e8814b3f7001365c647ebb7))
- integrating the Image component, it is draggable and resizable now ([e682b0a](https://github.com/chunyulo-code/mind-chat/commit/e682b0ad1d9a06ec7c777fb7c2c66ace180df727))
- intergrating right-click-menu,make the Spotlight update dynamically, and fix all types bugs ([552f15f](https://github.com/chunyulo-code/mind-chat/commit/552f15f3832d717fbc372f29854978c1f3518408))
- make copy function in contextMenu workable, add selectedNode styles and state in redux ([f366bc8](https://github.com/chunyulo-code/mind-chat/commit/f366bc850ee4a03b62fd238a39067984d7a41ef8))
- make the delete option in node's contextMenu workable ([2f451d6](https://github.com/chunyulo-code/mind-chat/commit/2f451d6bcd6f078fe1501a294eacd63fe1581afe))
- move the nodes, edges data to redux instead of in Flow component ([db66094](https://github.com/chunyulo-code/mind-chat/commit/db6609465d75e8e85a08fa7df982babdb80753ff))
- switching Mind_Map and Drawing mode is completed, can also switch colors now ([161ca1e](https://github.com/chunyulo-code/mind-chat/commit/161ca1e4c0eab0aeb2e374afd232ae866c32d64e))
- user can brainstorm the specific topic now, but the nodes are not in correct position ([5142286](https://github.com/chunyulo-code/mind-chat/commit/514228673aec50120a41faa456ef04a99c6cb815))

# 0.1.0 (2023-06-29)

### Bug Fixes

- **canvas.tsx:** correct the types of ctx and canvasTypes ([3ccd92a](https://github.com/chunyulo-code/mind-chat/commit/3ccd92aa81dfe76834f183e3f4e774e74c1cfaa0))
- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))
- due to the lack of support for React 18 in react-split-pane-next, switched to Allotment instead ([3f6e1c2](https://github.com/chunyulo-code/mind-chat/commit/3f6e1c2827888d7a55e5eb8e1c783984247e7459))
- minor update the Flow component's useEffect function to make the initialNodes rendered ([73c707d](https://github.com/chunyulo-code/mind-chat/commit/73c707d5a2006802d49894e1cc9673a653c1ac23))
- **page.tsx:** create SplitPane and Pane's children types in node_modules folder ([a102301](https://github.com/chunyulo-code/mind-chat/commit/a102301e1a192624450427867b64553254c69773))
- re-write a react-split-pane-next.d.ts file at root folder named types ([56f0682](https://github.com/chunyulo-code/mind-chat/commit/56f06822e3effe6eb0981242e61610921bd1c068))
- upadate .gitignore and API Key ([3db6723](https://github.com/chunyulo-code/mind-chat/commit/3db67236a2d475c95d72c7bb74262480a33a9574))

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- confirm the data from redux is great ([d69ba9b](https://github.com/chunyulo-code/mind-chat/commit/d69ba9bc371ae7fb9a60cb484dd73f43d8662440))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))
- integrating ChatGPT and Reactflow ([f096b50](https://github.com/chunyulo-code/mind-chat/commit/f096b50d6f1e370dc8b64123527b3d91ab955ac8))
- integrating Edges in Flow component when ChatGPT responsing ([64a076c](https://github.com/chunyulo-code/mind-chat/commit/64a076cc5b388b9ef8cd6e9acd7074b85bc63972))
- integrating right bar and toolbar at the bottom to the map page ([f507146](https://github.com/chunyulo-code/mind-chat/commit/f507146b8f5246434e8814b3f7001365c647ebb7))
- integrating the Image component, it is draggable and resizable now ([e682b0a](https://github.com/chunyulo-code/mind-chat/commit/e682b0ad1d9a06ec7c777fb7c2c66ace180df727))
- intergrating right-click-menu,make the Spotlight update dynamically, and fix all types bugs ([552f15f](https://github.com/chunyulo-code/mind-chat/commit/552f15f3832d717fbc372f29854978c1f3518408))
- move the nodes, edges data to redux instead of in Flow component ([db66094](https://github.com/chunyulo-code/mind-chat/commit/db6609465d75e8e85a08fa7df982babdb80753ff))
- switching Mind_Map and Drawing mode is completed, can also switch colors now ([161ca1e](https://github.com/chunyulo-code/mind-chat/commit/161ca1e4c0eab0aeb2e374afd232ae866c32d64e))

# 0.1.0 (2023-06-28)

### Bug Fixes

- **canvas.tsx:** correct the types of ctx and canvasTypes ([3ccd92a](https://github.com/chunyulo-code/mind-chat/commit/3ccd92aa81dfe76834f183e3f4e774e74c1cfaa0))
- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))
- due to the lack of support for React 18 in react-split-pane-next, switched to Allotment instead ([3f6e1c2](https://github.com/chunyulo-code/mind-chat/commit/3f6e1c2827888d7a55e5eb8e1c783984247e7459))
- minor update the Flow component's useEffect function to make the initialNodes rendered ([73c707d](https://github.com/chunyulo-code/mind-chat/commit/73c707d5a2006802d49894e1cc9673a653c1ac23))
- **page.tsx:** create SplitPane and Pane's children types in node_modules folder ([a102301](https://github.com/chunyulo-code/mind-chat/commit/a102301e1a192624450427867b64553254c69773))
- re-write a react-split-pane-next.d.ts file at root folder named types ([56f0682](https://github.com/chunyulo-code/mind-chat/commit/56f06822e3effe6eb0981242e61610921bd1c068))
- upadate .gitignore and API Key ([3db6723](https://github.com/chunyulo-code/mind-chat/commit/3db67236a2d475c95d72c7bb74262480a33a9574))

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- confirm the data from redux is great ([d69ba9b](https://github.com/chunyulo-code/mind-chat/commit/d69ba9bc371ae7fb9a60cb484dd73f43d8662440))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))
- integrating ChatGPT and Reactflow ([f096b50](https://github.com/chunyulo-code/mind-chat/commit/f096b50d6f1e370dc8b64123527b3d91ab955ac8))
- integrating Edges in Flow component when ChatGPT responsing ([64a076c](https://github.com/chunyulo-code/mind-chat/commit/64a076cc5b388b9ef8cd6e9acd7074b85bc63972))
- integrating right bar and toolbar at the bottom to the map page ([f507146](https://github.com/chunyulo-code/mind-chat/commit/f507146b8f5246434e8814b3f7001365c647ebb7))
- integrating the Image component, it is draggable and resizable now ([e682b0a](https://github.com/chunyulo-code/mind-chat/commit/e682b0ad1d9a06ec7c777fb7c2c66ace180df727))
- intergrating right-click-menu,make the Spotlight update dynamically, and fix all types bugs ([552f15f](https://github.com/chunyulo-code/mind-chat/commit/552f15f3832d717fbc372f29854978c1f3518408))
- switching Mind_Map and Drawing mode is completed, can also switch colors now ([161ca1e](https://github.com/chunyulo-code/mind-chat/commit/161ca1e4c0eab0aeb2e374afd232ae866c32d64e))

# 0.1.0 (2023-06-27)

### Bug Fixes

- **canvas.tsx:** correct the types of ctx and canvasTypes ([3ccd92a](https://github.com/chunyulo-code/mind-chat/commit/3ccd92aa81dfe76834f183e3f4e774e74c1cfaa0))
- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))
- **page.tsx:** create SplitPane and Pane's children types in node_modules folder ([a102301](https://github.com/chunyulo-code/mind-chat/commit/a102301e1a192624450427867b64553254c69773))
- upadate .gitignore and API Key ([3db6723](https://github.com/chunyulo-code/mind-chat/commit/3db67236a2d475c95d72c7bb74262480a33a9574))

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- confirm the data from redux is great ([d69ba9b](https://github.com/chunyulo-code/mind-chat/commit/d69ba9bc371ae7fb9a60cb484dd73f43d8662440))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))
- integrating ChatGPT and Reactflow ([f096b50](https://github.com/chunyulo-code/mind-chat/commit/f096b50d6f1e370dc8b64123527b3d91ab955ac8))
- integrating right bar and toolbar at the bottom to the map page ([f507146](https://github.com/chunyulo-code/mind-chat/commit/f507146b8f5246434e8814b3f7001365c647ebb7))
- integrating the Image component, it is draggable and resizable now ([e682b0a](https://github.com/chunyulo-code/mind-chat/commit/e682b0ad1d9a06ec7c777fb7c2c66ace180df727))
- intergrating right-click-menu,make the Spotlight update dynamically, and fix all types bugs ([552f15f](https://github.com/chunyulo-code/mind-chat/commit/552f15f3832d717fbc372f29854978c1f3518408))
- switching Mind_Map and Drawing mode is completed, can also switch colors now ([161ca1e](https://github.com/chunyulo-code/mind-chat/commit/161ca1e4c0eab0aeb2e374afd232ae866c32d64e))

# 0.1.0 (2023-06-27)

### Bug Fixes

- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))
- upadate .gitignore and API Key ([3db6723](https://github.com/chunyulo-code/mind-chat/commit/3db67236a2d475c95d72c7bb74262480a33a9574))

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- confirm the data from redux is great ([d69ba9b](https://github.com/chunyulo-code/mind-chat/commit/d69ba9bc371ae7fb9a60cb484dd73f43d8662440))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))
- integrating right bar and toolbar at the bottom to the map page ([f507146](https://github.com/chunyulo-code/mind-chat/commit/f507146b8f5246434e8814b3f7001365c647ebb7))
- integrating the Image component, it is draggable and resizable now ([e682b0a](https://github.com/chunyulo-code/mind-chat/commit/e682b0ad1d9a06ec7c777fb7c2c66ace180df727))
- intergrating right-click-menu,make the Spotlight update dynamically, and fix all types bugs ([552f15f](https://github.com/chunyulo-code/mind-chat/commit/552f15f3832d717fbc372f29854978c1f3518408))
- switching Mind_Map and Drawing mode is completed, can also switch colors now ([161ca1e](https://github.com/chunyulo-code/mind-chat/commit/161ca1e4c0eab0aeb2e374afd232ae866c32d64e))

# 0.1.0 (2023-06-27)

### Bug Fixes

- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))
- upadate .gitignore and API Key ([3db6723](https://github.com/chunyulo-code/mind-chat/commit/3db67236a2d475c95d72c7bb74262480a33a9574))

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- confirm the data from redux is great ([d69ba9b](https://github.com/chunyulo-code/mind-chat/commit/d69ba9bc371ae7fb9a60cb484dd73f43d8662440))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))
- integrating right bar and toolbar at the bottom to the map page ([f507146](https://github.com/chunyulo-code/mind-chat/commit/f507146b8f5246434e8814b3f7001365c647ebb7))
- intergrating right-click-menu,make the Spotlight update dynamically, and fix all types bugs ([552f15f](https://github.com/chunyulo-code/mind-chat/commit/552f15f3832d717fbc372f29854978c1f3518408))
- switching Mind_Map and Drawing mode is completed, can also switch colors now ([161ca1e](https://github.com/chunyulo-code/mind-chat/commit/161ca1e4c0eab0aeb2e374afd232ae866c32d64e))

# 0.1.0 (2023-06-26)

### Bug Fixes

- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))
- upadate .gitignore and API Key ([3db6723](https://github.com/chunyulo-code/mind-chat/commit/3db67236a2d475c95d72c7bb74262480a33a9574))

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- confirm the data from redux is great ([d69ba9b](https://github.com/chunyulo-code/mind-chat/commit/d69ba9bc371ae7fb9a60cb484dd73f43d8662440))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))
- integrating right bar and toolbar at the bottom to the map page ([f507146](https://github.com/chunyulo-code/mind-chat/commit/f507146b8f5246434e8814b3f7001365c647ebb7))
- intergrating right-click-menu,make the Spotlight update dynamically, and fix all types bugs ([552f15f](https://github.com/chunyulo-code/mind-chat/commit/552f15f3832d717fbc372f29854978c1f3518408))

# 0.1.0 (2023-06-26)

### Bug Fixes

- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))
- upadate .gitignore and API Key ([3db6723](https://github.com/chunyulo-code/mind-chat/commit/3db67236a2d475c95d72c7bb74262480a33a9574))

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- confirm the data from redux is great ([d69ba9b](https://github.com/chunyulo-code/mind-chat/commit/d69ba9bc371ae7fb9a60cb484dd73f43d8662440))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))
- integrating right bar and toolbar at the bottom to the map page ([f507146](https://github.com/chunyulo-code/mind-chat/commit/f507146b8f5246434e8814b3f7001365c647ebb7))

# 0.1.0 (2023-06-25)

### Bug Fixes

- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))
- upadate .gitignore and API Key ([3db6723](https://github.com/chunyulo-code/mind-chat/commit/3db67236a2d475c95d72c7bb74262480a33a9574))

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- confirm the data from redux is great ([d69ba9b](https://github.com/chunyulo-code/mind-chat/commit/d69ba9bc371ae7fb9a60cb484dd73f43d8662440))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))

# 0.1.0 (2023-06-25)

### Bug Fixes

- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- confirm the data from redux is great ([d69ba9b](https://github.com/chunyulo-code/mind-chat/commit/d69ba9bc371ae7fb9a60cb484dd73f43d8662440))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))

# 0.1.0 (2023-06-25)

### Bug Fixes

- delete all gptContext import lines in every files ([87e6f58](https://github.com/chunyulo-code/mind-chat/commit/87e6f5882ba0828c14522429ef09c69dd48a98a9))

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))

# 0.1.0 (2023-06-25)

### Features

- add redux to the project, and replace the GptResponseContext ([d790fc6](https://github.com/chunyulo-code/mind-chat/commit/d790fc6086b2d07e081a52f25fef10319e63bcc8))
- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))

# 0.1.0 (2023-06-25)

### Features

- improve the user experience, the response of ChatGPT can stream the response now ([ae8563c](https://github.com/chunyulo-code/mind-chat/commit/ae8563cf773b7fd24ea9f1be23cfe56ade342a11))

# 0.1.0 (2023-06-22)

# 0.1.0 (2023-06-21)

# 0.1.0 (2023-06-21)
