import { toTitleCase } from './toTitleCase';
export function fixTitle(name) {
    return name && toTitleCase(name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' '));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4VGl0bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbmdzZi9jb21tb24vIiwic291cmNlcyI6WyJsaWIvZnVuY3Rpb25zL3V0aWxpdHkvZml4VGl0bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQTtBQUt6QyxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQVk7SUFDbkMsT0FBTyxJQUFJLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ3pGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3RvVGl0bGVDYXNlfSBmcm9tICcuL3RvVGl0bGVDYXNlJ1xuXG4vKipcbiAqICdmaXhUaXRsZScgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpeFRpdGxlKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBuYW1lICYmIHRvVGl0bGVDYXNlKG5hbWUucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxICQyJykucmVwbGFjZSgvXy9nLCAnICcpKVxufVxuIl19