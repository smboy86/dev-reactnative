var appearingAxis=[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:"axis"}],appearingFinal=[{initialAttr:{opacity:0},finalAttr:{opacity:1},slot:"final"}],axisAnimationFinal={"text.appearing":appearingFinal,"path.appearing":appearingFinal,"rect.appearing":appearingFinal},axisAnimationAxis={"text.appearing":appearingAxis,"path.appearing":appearingAxis,"rect.appearing":appearingAxis,"scrollbar.appearing":appearingAxis};export default{"initial.axis.numeric":axisAnimationAxis,"initial.axis.category":axisAnimationAxis,"initial.axis.log":axisAnimationAxis,"update.axis.numeric":axisAnimationFinal,"update.axis.category":axisAnimationFinal,"update.axis.log":axisAnimationFinal};export{appearingAxis,appearingFinal,axisAnimationAxis,axisAnimationFinal};