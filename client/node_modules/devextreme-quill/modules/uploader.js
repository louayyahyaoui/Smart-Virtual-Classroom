import Delta from 'quill-delta';
import Emitter from '../core/emitter';
import Module from '../core/module';
import hasWindow from '../utils/hasWindow';

class Uploader extends Module {
  constructor(quill, options) {
    super(quill, options);

    this.addDragOverHandler();
    this.addDropHandler();
  }

  addDragOverHandler() {
    if (hasWindow()) {
      const ua = window.navigator.userAgent.toLowerCase();
      const isMsIe =
        ua.indexOf('msie ') !== -1 ||
        ua.indexOf('trident/') !== -1 ||
        ua.indexOf('edge/') !== -1;

      if (isMsIe) {
        this.quill.root.addEventListener('dragover', e => {
          e.preventDefault();
        });
      }
    }
  }

  addDropHandler() {
    this.quill.root.addEventListener('drop', e => {
      e.preventDefault();
      let native;
      const { onDrop } = this.options;

      if (onDrop && typeof onDrop === 'function') {
        onDrop(e);
      }

      if (document.caretRangeFromPoint) {
        native = document.caretRangeFromPoint(e.clientX, e.clientY);
      } else if (document.caretPositionFromPoint) {
        const position = document.caretPositionFromPoint(e.clientX, e.clientY);
        native = document.createRange();
        native.setStart(position.offsetNode, position.offset);
        native.setEnd(position.offsetNode, position.offset);
      } else {
        return;
      }
      const normalized = this.quill.selection.normalizeNative(native);
      const range = this.quill.selection.normalizedToRange(normalized);
      this.upload(range, e.dataTransfer.files);
    });
  }

  upload(range, files) {
    const uploads = [];
    Array.from(files).forEach(file => {
      if (file && this.options.mimetypes.indexOf(file.type) !== -1) {
        uploads.push(file);
      }
    });
    if (uploads.length > 0) {
      this.options.handler.call(this, range, uploads, this.options.imageBlot);
    }
  }
}

Uploader.DEFAULTS = {
  mimetypes: ['image/png', 'image/jpeg'],
  imageBlot: 'image',
  handler(range, files, blotName) {
    const promises = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then(images => {
      const update = images.reduce((delta, image) => {
        return delta.insert({ [blotName]: image });
      }, new Delta().retain(range.index).delete(range.length));
      this.quill.updateContents(update, Emitter.sources.USER);
      this.quill.setSelection(
        range.index + images.length,
        Emitter.sources.SILENT,
      );
    });
  },
};

export default Uploader;
