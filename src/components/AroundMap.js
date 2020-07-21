import React, {Component} from 'react';
import {POS_KEY} from '../constants';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";

import AroundMarker from './AroundMarker';

class NormalAroundMap extends Component {

    getMapRef = (mapInstance) => {
        this.map = mapInstance;
        window.map = mapInstance;
    };

    reloadMarker = () => {
        const center = this.map.getCenter();
        const centerObj = {lat: center.lat(), lon: center.lng()};
        console.log(centerObj);

        const radius = this.getRadius();
        this.props.loadPostsByTopic(centerObj, radius);
    };

    getCenter() {
        const center = this.map.getCenter();
        return {lat: center.lat(), lon: center.lng()};
    }

    getRadius() {
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new window.google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * window.google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    }

    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <GoogleMap
                ref={this.getMapRef}
                defaultZoom={11}
                defaultCenter={{lat, lng: lon}}
                onDragEnd={this.reloadMarker}
                onZoomChanged={this.reloadMarker}
            >
                {this.props.posts.map((post) => <AroundMarker post={post} key={post.url}/>)}
            </GoogleMap>
        );
    }
}

const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));
export default AroundMap;
