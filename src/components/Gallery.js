import React, {Component} from 'react';
// source: https://github.com/benhowell/react-grid-gallery
import GridGallery from 'react-grid-gallery';
// PropTypes doc: https://reactjs.org/docs/typechecking-with-proptypes.html
import PropTypes from 'prop-types';

class Gallery extends Component {
    // 類型校驗，不符合會丟warning，很溫和
    static propTypes = {
        // images 是一個array
        images: PropTypes.arrayOf(
            // image中元素必須滿足
            // An object taking on a particular shape
            PropTypes.shape({
                user: PropTypes.string.isRequired, // value is required
                src: PropTypes.string.isRequired,
                thumbnail: PropTypes.string.isRequired,
                thumbnailWidth: PropTypes.number.isRequired,
                thumbnailHeight: PropTypes.number.isRequired,
                caption: PropTypes.string, // value is optional, can be undefined
            })
        ).isRequired
    };

    render() {
        const images = this.props.images.map((image) => {
            return {
                ...image,
                // overlay 是覆蓋圖片的信息
                // 鼠標放上去會浮現的黑底白字
                customOverlay: (
                    <div className="gallery-thumbnail">
                        <div>{`${image.user}: ${image.caption}`}</div>
                    </div>
                ),
            };
        });

        return (
            <div className="gallery">
                <GridGallery
                    // 允許點擊黑色區域關閉圖片
                    backdropClosesModal
                    images={images}
                    // 去掉選擇標記
                    enableImageSelection={false}/>
            </div>
        );
    }
}

export default Gallery;
