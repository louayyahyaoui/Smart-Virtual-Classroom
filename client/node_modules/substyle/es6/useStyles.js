import { useContext, useMemo } from 'react';
import { PropsDecoratorContext } from './PropsDecoratorProvider';
import createSubstyle from './createSubstyle';

var useStyles = function useStyles(defaultStyle, _ref, modifiers) {
  var style = _ref.style,
      className = _ref.className,
      classNames = _ref.classNames;
  var propsDecorator = useContext(PropsDecoratorContext);
  var substyle = useMemo(function () {
    return createSubstyle({
      style: style,
      className: className,
      classNames: classNames
    }, propsDecorator);
  }, [style, className, classNames, propsDecorator]);
  return substyle(modifiers, defaultStyle);
};

export default useStyles;