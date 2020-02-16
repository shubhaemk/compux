export const getClassTemplate = componentNameCc => {
  const classTemplate = `import React from 'react';
class ${componentNameCc} extends React.Component{
  render(){
    return(
      <div>
        <h1>${componentNameCc} component is created using Compux</h1>
      </div>
    )
  }
}

export default ${componentNameCc};`;

  return classTemplate;
};

export const getFunctionTemplate = componentNameCc => {
  const classTemplate = `import React from 'react';
const ${componentNameCc} = () => {
  return(
    <div>
      <h1>${componentNameCc} component is created using Compux</h1>
    </div>
  )
}

export default ${componentNameCc};`;

  return classTemplate;
};
